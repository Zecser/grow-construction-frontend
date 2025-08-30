import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, useLogin } from "../hooks/useLogin";
import { z } from "zod";
import { useState} from "react";
import { Button } from "../../../components/ui/button";
import { Link,useNavigate} from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { login, loading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

 
  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data);
    if (success) {
      navigate("/admin/dashboard", { replace: true });
    }
  };

  return (
    <div className=" flex items-center justify-center  px-4">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-primary"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="text-end">
              <Link
                to="/admin/forgot-password"
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white rounded-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
