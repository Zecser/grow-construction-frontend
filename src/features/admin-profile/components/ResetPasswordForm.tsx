import PasswordField from "./PasswordField";
import { useResetPassword } from "../hooks/useResetPassword";
import { Toaster } from "react-hot-toast";

export default function ResetPasswordForm() {
  const {
    passwords,
    errors,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useResetPassword();

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Change Password
      </h3>

      <div className="space-y-6">
        <PasswordField
          name="currentPassword"
          placeholder="Current Password"
          value={passwords.currentPassword}
          error={errors.currentPassword}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <PasswordField
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          error={errors.newPassword}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <PasswordField
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={passwords.confirmPassword}
          error={errors.confirmPassword}
          disabled={isLoading}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="flex justify-center pt-2">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-[#0e644c] text-white py-3 rounded-full font-semibold hover:bg-[#0c5741] transition disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
