import { useState, useEffect } from "react";
import {
  ProfileHeader,
  ProfilePhoto,
  ProfileForm,
  SaveButton,
  useProfile,
  ImageCropper,
} from "../../features/admin-profile";
import ArrowBack from "@/components/buttons/ArrowBack";

const ProfileEdit = () => {
  const { profile, setProfile, errors, loading, handleChange, updateProfile } = useProfile();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string>("");

  // Show existing profile profile_picture when opening edit
  useEffect(() => {
    if (profile.profile_picture && typeof profile.profile_picture === "string") {
      setCroppedImage(profile.profile_picture);
    }
  }, [profile.profile_picture]);

  // When profile_picture selected
  const handlePhotoChange = (file?: File) => {
    if (file) {
      setSelectedFile(file);
      setCropModalOpen(true); // open cropper
    }
  };

  // After cropping
  const handleCropComplete = async (croppedDataUrl: string) => {
    let file: File;

    if (croppedDataUrl.startsWith("data:image/")) {
      // Base64 → File
      const arr = croppedDataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpg";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      file = new File([u8arr], "cropped.jpg", { type: mime });
    } else {
      // Blob URL → File
      const response = await fetch(croppedDataUrl);
      const blob = await response.blob();
      file = new File([blob], "cropped.jpg", { type: blob.type });
    }

    // ✅ update both preview and actual profile state
    setCroppedImage(croppedDataUrl);
    setProfile((prev) => ({ ...prev, profile_picture: file }));
    setCropModalOpen(false);
  };

  // Save button → update local profile
  const handleSave = () => {
    updateProfile();
  };

  return (
    <div className="min-h-screen px-4 py-6 flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-6">
        <ArrowBack/>
        <ProfileHeader />
        
        <ProfilePhoto profile_picture={croppedImage} onPhotoChange={handlePhotoChange} />

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
