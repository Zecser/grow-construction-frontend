import { useState, useEffect } from "react";
import api from "../../../lib/api"; // your axios instance
import toast from "react-hot-toast";


export interface UserProfile {
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  postal_code: string;
  tax_id: string;
  role: string;
  email: string;
  city: string;
  profile_picture: File | string;
}

export const useFetchProfile = () => {
  const [user, setUser] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    phone: "",
    country: "",
    postal_code: "",
    tax_id: "",
    role: "",
    email: "",
    city: "",
    profile_picture: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get<UserProfile>("/profile/");
        setUser({
          ...res.data,
          profile_picture: res.data.profile_picture,
        });
      
      } catch (err) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, setUser, loading };
};
