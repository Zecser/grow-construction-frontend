import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { setAdmin, setError, type AdminType } from "@/store/adminAuthSlice";

export const baseURL = import.meta.env.VITE_API_URL || "";
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const [loading, setLoadingState] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);
  const dispatch = useDispatch()

  const login = async (data: LoginFormValues) => {
    try {
      setLoadingState(true);
      setErrorState(null);

      const response = await axios.post(`${baseURL}/login/`, {
        email: data.email,
        password: data.password
      })

      const resData = response.data

      localStorage.setItem("accessToken", resData?.access)
      localStorage.setItem("refreshToken", resData?.refresh)

      dispatch(setAdmin(resData?.user as AdminType))

      return true;
    } catch (err: any) {
      const msg =
        err.response?.data?.detail || err.message || "Login failed. Try again.";
      setErrorState(msg);
      dispatch(setError(msg));
      return false;
    } finally {
      setLoadingState(false);
    }
  };

  return { login, loading, error };
};
