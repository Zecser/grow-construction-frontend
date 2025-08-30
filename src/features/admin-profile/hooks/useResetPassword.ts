import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const fakeApiCall = (duration: number) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

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
    if (!validateForm()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    setIsLoading(true);
    try {
      await fakeApiCall(1500);
      toast.success("Password Changed Successfully!");
      navigate("/admin/profile");
    } catch (error: any) {
      toast.error("Failed to change password.");
    } finally {
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
