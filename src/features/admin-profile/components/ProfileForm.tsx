import type { ProfileData } from "../hooks/useProfile";

interface Props {
  profile: ProfileData;
  errors: Record<string, string | undefined>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const fields: { 
  name: Exclude<keyof ProfileData, "profile_picture" | "role">; 
  type?: string; 
  label: string 
}[] = [
  { name: "first_name", label: "First Name" },
  { name: "last_name", label: "Last Name" },
  { name: "email", type: "email", label: "Email" },
  { name: "phone", type: "tel", label: "Phone" },
  { name: "country", label: "Country" },
  { name: "city", label: "City" },
  { name: "postal_code", label: "Postal Code" },
  { name: "tax_id", label: "Tax ID" },
];

const ProfileForm: React.FC<Props> = ({ profile, errors, onChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5 mb-8">
    {fields.map((f) => (
      <div key={f.name}>
        <label 
          htmlFor={f.name} 
          className="text-medium font-medium text-gray-700 mb-1"
        >
          {f.label}
        </label>
        <input
          name={f.name}
          type={f.type || "text"}
          value={profile[f.name] || ""}
          onChange={onChange}
          placeholder={f.name.replace(/([A-Z])/g, " $1")}
          className={`px-4 py-3 rounded-xl shadow bg-white border w-full ${errors[f.name] ? "border-red-500" : "border-gray-200"}`}
        />
        {errors[f.name] && <p className="text-red-500 text-xs mt-1">*{errors[f.name]}</p>}
      </div>
    ))}
  </div>
);

export default ProfileForm;

