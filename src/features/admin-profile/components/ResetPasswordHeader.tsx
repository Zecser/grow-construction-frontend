import { useNavigate } from "react-router-dom";

export default function ResetPasswordHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center mb-10 gap-2">
      <button
        onClick={() => navigate("/admin/profile")}
        className="text-green-700 hover:text-green-800"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 className="text-xl font-semibold text-green-800">
        Reset Password
      </h1>
    </div>
  );
}
