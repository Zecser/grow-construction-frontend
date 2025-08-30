import React from "react";

interface TextAreaFieldProps {
    id: string;
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    rows?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
    id,
    label,
    name,
    value,
    placeholder,
    rows = 4,
    onChange,
    required = false,
}) => {
    return (
        <div className="flex flex-col items-start gap-[6px] w-full">
            <label htmlFor={id} className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-normal">{label}</label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                className="w-full px-[25px] py-[15px] outline-none bg-grayLight text-sm sm:text-base md:text-lg lg:text-xl"
            ></textarea>
        </div>
    );
};

export default TextAreaField;
