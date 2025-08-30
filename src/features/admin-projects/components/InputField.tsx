import React from "react";

interface InputFieldProps {
    id: string;
    label: string;
    name: string;
    type?: string;
    value: string | number;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    name,
    type = "text",
    value,
    placeholder,
    onChange,
    required = false,
    className = "",
}) => {
    return (
        <div className="flex flex-col items-start gap-[6px] w-full">
            <label htmlFor={id} className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-normal">{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-[25px] py-[15px] outline-none bg-grayLight text-sm sm:text-base md:text-lg lg:text-xl${className}`}
            />
        </div>
    );
};

export default InputField;
