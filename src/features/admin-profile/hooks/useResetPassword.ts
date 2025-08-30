import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import api from "@/lib/api";

export function useResetPassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { currentPassword, newPassword } = passwords;

    if (name === "newPassword" || name === "currentPassword") {
      if (currentPassword && newPassword && currentPassword === newPassword) {
        setErrors(prev => ({
          ...prev,
          newPassword: "New password must be different from current password.",
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const { currentPassword, newPassword, confirmPassword } = passwords;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!currentPassword) newErrors.currentPassword = "Required";
    if (!newPassword) newErrors.newPassword = "Required";
    if (!confirmPassword) newErrors.confirmPassword = "Required";

    if (newPassword && newPassword.length < 8) {
      newErrors.newPassword = "Must be at least 8 characters";
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword =
        "New password must be different from current password.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  const handleSubmit = async () => {
    // validate passwords
    if (!passwords.currentPassword) {
      setErrors(prev => ({
        ...prev,
        currentPassword: "Current password is required.",
      }));
      return;
    }
    if (!passwords.newPassword) {
      setErrors(prev => ({
        ...prev,
        newPassword: "New password is required.",
      }));
      return;
    }
    if (!passwords.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        newPassword: "Confirm password is required.",
      }));
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    if (passwords.currentPassword === passwords.newPassword) {
      setErrors(prev => ({
        ...prev,
        newPassword: "New password must be different from current password.",
      }));
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post(
        "/change-password/",
        {
          old_password: passwords.currentPassword,
          new_password: passwords.newPassword,
          confirm_new_password: passwords.confirmPassword,
        }
      );
      toast.success("Password Changed Successfully!");

      setTimeout(() => {
        navigate("/admin/profile", { replace: true });
      }, 1500);

    } catch (error: unknown) {
      const axiosError = error as AxiosError<any>;
      const data = axiosError.response?.data;

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  return {
    passwords,
    errors,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
