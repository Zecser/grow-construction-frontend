import { FiEdit } from "react-icons/fi";

interface Props {
  photo: string;
  onPhotoChange: (file?: File) => void;
}

const ProfilePhoto: React.FC<Props> = ({ photo, onPhotoChange }) => {
  return (
    <div className="flex mb-8">
      <div className="relative">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-200 overflow-hidden">
          <img src={photo || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <input type="file" id="photoInput" accept="image/*" className="hidden" onChange={(e) => onPhotoChange(e.target.files?.[0])} />
        <label htmlFor="photoInput" className="absolute -top-2 -right-2 p-2 bg-white rounded-full cursor-pointer shadow-md">
          <FiEdit size={21} className="text-green-800" />
        </label>
      </div>
    </div>
  );
};

export default ProfilePhoto;
