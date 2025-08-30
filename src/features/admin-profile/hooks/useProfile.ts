import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  taxId: string;
  photo: string;
  role?: string;
}

type ProfileErrors = Partial<Record<keyof Omit<ProfileData, "photo" | "role">, string>>;

const fakeApiCall = (duration: number) => new Promise(res => setTimeout(res, duration));

export const useProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState<ProfileData>({
    firstName: "", lastName: "", email: "", phone: "",
    country: "", city: "", postalCode: "", taxId: "", photo: "",
  });

  const [errors, setErrors] = useState<ProfileErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const passedUser = location.state?.user as ProfileData;
    if (passedUser) setProfile(passedUser);
    else {
      toast.error("Could not load profile data.");
      navigate("/admin/profile");
    }
  }, [location.state, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProfileErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhotoChange = (file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ProfileErrors = {};
    const textOnlyFields: (keyof ProfileErrors)[] = ["firstName", "lastName", "country", "city"];

    textOnlyFields.forEach((field) => {
      if (!profile[field]) newErrors[field] = "Required";
      else if (!/^[A-Za-z\s]+$/.test(profile[field])) newErrors[field] = "Only letters allowed";
    });

    if (!profile.email) newErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = "Invalid email";

    if (!profile.phone) newErrors.phone = "Required";
    else if (!/^\d{10}$/.test(profile.phone)) newErrors.phone = "Must be 10 digits";

    if (!profile.postalCode) newErrors.postalCode = "Required";
    else if (!/^\d{1,6}$/.test(profile.postalCode)) newErrors.postalCode = "Up to 6 digits";

    if (!profile.taxId) newErrors.taxId = "Required";
    else if (!/^[a-zA-Z0-9-]{10}$/.test(profile.taxId)) newErrors.taxId = "Must be 10 chars";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
    if (!validateForm()) {
      toast.error("Please fix errors.");
      return;
    }
    setLoading(true);
    try {
      await fakeApiCall(1500);
      localStorage.setItem("userProfile", JSON.stringify(profile));
      toast.success("Changes Saved!");
      navigate("/admin/profile");
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return { profile, errors, loading, handleChange, handlePhotoChange, updateProfile };
};
