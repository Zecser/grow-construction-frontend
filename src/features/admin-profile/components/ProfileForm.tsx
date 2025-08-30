import type { ProfileData } from "../hooks/useProfile";

interface Props {
  profile: ProfileData;
  errors: Record<string, string | undefined>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const fields: { name: keyof ProfileData; type?: string }[] = [
  { name: "firstName" }, { name: "lastName" },
  { name: "email", type: "email" }, { name: "phone", type: "tel" },
  { name: "country" }, { name: "city" },
  { name: "postalCode" }, { name: "taxId" },
];

const ProfileForm: React.FC<Props> = ({ profile, errors, onChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5 mb-8">
    {fields.map((f) => (
      <div key={f.name}>
        <input
          name={f.name}
          type={f.type || "text"}
          value={profile[f.name] || ""}
          onChange={onChange}
          placeholder={f.name.replace(/([A-Z])/g, " $1")}
          className={`px-4 py-3 rounded-xl shadow-md bg-white border w-full ${errors[f.name] ? "border-red-500" : "border-gray-200"}`}
        />
        {errors[f.name] && <p className="text-red-500 text-xs mt-1">*{errors[f.name]}</p>}
      </div>
    ))}
  </div>
);

export default ProfileForm;
