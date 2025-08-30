import { LoginForm } from "../../features/admin-auth";

const Login = () => {
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
