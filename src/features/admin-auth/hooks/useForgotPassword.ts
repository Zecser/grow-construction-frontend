import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store"; 
import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL || "";


export function useForgotPassword() {
  const { admin } = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
   const [otp, setOtp] = useState(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState("")

  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard",{replace:true});
    }
  }, [admin, navigate]);

    const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/forgot-password/`, { email });
      setMessage(res.data.message); // "OTP sent to email"
      setStep(2);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Invalid Email");
    } finally {
      setLoading(false);
    }
  };

   const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");  

    if (enteredOtp.length !== 6) {
      setMessage("Please enter the full 6-digit OTP.");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/verify-otp/`, {
        email,
        otp: enteredOtp,
        new_password: password,
      });

      setMessage(res.data.message || "Password reset successful");
       setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 1500);
      setStep(4);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Invalid OTP or request failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    email,
    setEmail,
    otp,
    setOtp,
    password,
    setPassword,
    confirm,
    setConfirm,
    loading,
    message,
    handleSendOtp,
    handleVerifyOtp
  };
}
