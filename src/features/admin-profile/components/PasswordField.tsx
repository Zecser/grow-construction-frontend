import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

interface PasswordFieldProps {
  name: "currentPassword" | "newPassword" | "confirmPassword";
  placeholder: string;
  value: string;
  error: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function PasswordField({
  name,
  placeholder,
  value,
  error,
  disabled,
  onChange,
  onBlur,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={visible ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full p-3 pr-10 rounded-md shadow-md outline-none placeholder-gray-400 border ${
          error ? "border-red-500" : "border-transparent"
        }`}
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {visible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </button>
      )}
      {error && <p className="text-red-500 text-xs mt-1">*{error}</p>}
    </div>
  );
}
