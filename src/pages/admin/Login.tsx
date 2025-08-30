import { useSelector } from "react-redux";
import { LoginForm } from "../../features/admin-auth";
import type { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { admin, checked, loading } = useSelector(
    (state: RootState) => state.admin
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (admin && checked && !loading) {
      navigate("/admin/dashboard");
    }
  }, [admin, checked, loading, navigate]);

  if (!checked || loading || admin) {
    return null;
  }
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
      <img
        src="/images/login-bg.png"
        alt="Login background image"
        className="w-full h-[40vh] md:h-full object-cover"
      />
      <LoginForm />
    </main>
  );
};

export default Login;
