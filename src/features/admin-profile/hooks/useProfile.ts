import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {toast} from "react-hot-toast";
import api from "../../../lib/api"; 

export interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postal_code: string;
  tax_id: string;
  profile_picture: string | File;
  role?: string;
}

type ProfileErrors = Partial<
  Record<keyof Omit<ProfileData, "profile_picture" | "role">, string>
>;

export const useProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postal_code: "",
    tax_id: "",
    profile_picture: "",
  });
  const [originalProfile, setOriginalProfile] = useState<ProfileData | null>(null);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [loading, setLoading] = useState(false);

  // Load profile from location.state OR API
  useEffect(() => {
    const passedUser = location.state?.user as ProfileData;
    if (passedUser) {
      setProfile(passedUser);
      setOriginalProfile(passedUser);
    } else {
      const fetchProfile = async () => {
        try {
          const res = await api.get<ProfileData>("/profile/");
          setProfile(res.data);
          setOriginalProfile(res.data);
        } catch (err) {
          toast.error("Could not load profile data.");
          navigate("/admin/profile");
        }
      };
      fetchProfile();
    }
  }, [location.state, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProfileErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ProfileErrors = {};
    const textOnlyFields: (keyof ProfileErrors)[] = [
      "first_name",
      "last_name",
      "country",
      "city",
    ];

    textOnlyFields.forEach((field) => {
      if (!profile[field]) newErrors[field] = "Required";
      else if (!/^[A-Za-z\s]+$/.test(profile[field])) newErrors[field] = "Only letters allowed";
    });

    if (!profile.email) newErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = "Invalid email";

    if (!profile.phone) newErrors.phone = "Required";
    else if (!/^\d{10}$/.test(profile.phone)) newErrors.phone = "Must be 10 digits";

    if (!profile.postal_code) newErrors.postal_code = "Required";
    else if (!/^\d{6}$/.test(profile.postal_code)) newErrors.postal_code = "must be 6 digits";

    if (!profile.tax_id) newErrors.tax_id = "Required";
    else if (!/^[a-zA-Z0-9-]{10}$/.test(profile.tax_id)) newErrors.tax_id = "Must be 10 chars";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
  if (!validateForm()) {
    toast.error("Please fix errors.");
    return;
  }

  if (!originalProfile) return;

  setLoading(true);
  try {
    const formData = new FormData();

    
    Object.entries(profile).forEach(([key, value]) => {
      if (key === "role" || key === "profile_picture") return;

      if (value !== (originalProfile as any)[key]) {
        formData.append(key, value as string);
      }
    });

    
    if (profile.profile_picture instanceof File) {
      formData.append("profile_picture", profile.profile_picture);
    }

    
    if ([...formData.keys()].length === 0) {
      toast.success("No changes to save.");
      navigate("/admin/profile");
      return;
    }

    const res = await api.put<ProfileData>("/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setProfile(res.data);
    setOriginalProfile(res.data);
    toast.success("Changes Saved!");
    navigate("/admin/profile");
  } catch (err) {
    toast.error("Failed to save profile.");
  } finally {
    setLoading(false);
  }
};
  return { profile, setProfile, errors, loading, handleChange, updateProfile };
};