import React from "react";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  label: string;
  placeholder?: string;
  error?: string;
  register?: any;
  name: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  error,
  register,
  name,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-200">{label}</label>
      <Input
        className={`!bg-white ${className}`}
        placeholder={placeholder}
        {...(register ? register(name) : {})}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
