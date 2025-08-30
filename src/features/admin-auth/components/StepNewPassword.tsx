import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface StepNewPasswordProps {
  password: string;
  confirm: string;
  setPassword: (v: string) => void;
  setConfirm: (v: string) => void;
  onSubmit: () => void;
}

export default function StepNewPassword({
  password,
  confirm,
  setPassword,
  setConfirm,
  onSubmit,
}: StepNewPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string>("");

  const handleSubmit = () => {
    if (!password || !confirm) {
      setLocalError("Please fill out both fields.");
      return;
    }
    if (password !== confirm) {
      setLocalError("Passwords do not match.");
      return;
    }
    setLocalError("");
    onSubmit();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">
        Your new password must be different from previously used ones.
      </p>

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-2 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      {localError && (
        <p className="text-sm text-red-500">{localError}</p>
      )}

      <Button className="w-full text-white" onClick={handleSubmit}>
        Create
      </Button>
    </div>
  );
}
