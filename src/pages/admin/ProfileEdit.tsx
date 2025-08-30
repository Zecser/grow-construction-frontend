import { useState, useEffect } from "react";
import {
  ProfileHeader,
  ProfilePhoto,
  ProfileForm,
  SaveButton,
  useProfile,
  ImageCropper,
} from "../../features/admin-profile";

const ProfileEdit = () => {
  const { profile, errors, loading, handleChange, updateProfile } = useProfile();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string>("");

  // Show existing profile photo when opening edit
  useEffect(() => {
    if (profile.photo) {
      setCroppedImage(profile.photo);
    }
  }, [profile.photo]);

  // When photo selected
  const handlePhotoChange = (file?: File) => {
    if (file) {
      setSelectedFile(file);
      setCropModalOpen(true); // open cropper
    }
  };

  // After cropping
  const handleCropComplete = (croppedDataUrl: string) => {
    setCroppedImage(croppedDataUrl); // update local photo
    setCropModalOpen(false);
  };

  // Save button → update local profile
  const handleSave = () => {
    // update the photo in the existing profile
    profile.photo = croppedImage;
    updateProfile(); // call without arguments
  };

  return (
    <div className="min-h-screen px-4 py-6 flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-6">
        <ProfileHeader />

        <ProfilePhoto photo={croppedImage} onPhotoChange={handlePhotoChange} />

        <ProfileForm profile={profile} errors={errors} onChange={handleChange} />

        <SaveButton onClick={handleSave} loading={loading} />
      </div>

      {/* Cropper Modal */}
      {cropModalOpen && selectedFile && (
        <ImageCropper
          imageFile={selectedFile}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileEdit;
