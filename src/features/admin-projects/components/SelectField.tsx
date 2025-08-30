import React from "react";

interface SelectFieldProps {
    id: string;
    label: string;
    name: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    name,
    value,
    options,
    onChange,
    required = false,
}) => {
    return (
        <div className="flex flex-col items-start gap-[6px] w-full">
            <label htmlFor={id} className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-normal">{label}</label>
            <div className="relative w-full">
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full px-[25px] py-[15px] appearance-none outline-none bg-grayLight text-sm sm:text-base md:text-lg lg:text-xl block"
                >
                    <option value="" disabled>Select an option</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-[25px] text-black pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default SelectField;
