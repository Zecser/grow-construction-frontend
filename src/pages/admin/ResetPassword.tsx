import { ResetPasswordHeader, ResetPasswordForm } from "../../features/admin-profile";

export default function ResetPassword() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <ResetPasswordHeader />
        <ResetPasswordForm />
      </div>
    </div>
  );
}
