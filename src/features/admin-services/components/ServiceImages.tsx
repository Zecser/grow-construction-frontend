import React, { useState } from "react";
import ImageCropModal from "./ImageCropModal";
import upload from "../../../assets/upload.png";
import noimage from "../../../assets/noimage.jpg";

interface ServiceImagesProps {
  setIcon: (file: File) => void;
  setBanner: (file: File) => void;
  setPhoto: (file: File) => void;
  errors?: { icon?: string; banner?: string; photo?: string };
  initialIconUrl?: string | null;
  initialBannerUrl?: string | null;
  initialPhotoUrl?: string | null;
}

const ServiceImages: React.FC<ServiceImagesProps> = ({
  setIcon,
  setBanner,
  setPhoto,
  errors,
  initialIconUrl,
  initialBannerUrl,
  initialPhotoUrl,
}) => {
  const [iconPreview, setIconPreview] = useState<string | null>(initialIconUrl || null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(initialBannerUrl || null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(initialPhotoUrl || null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [cropOpen, setCropOpen] = useState(false);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIcon(file);
    setIconPreview(URL.createObjectURL(file));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBanner(file);
    setCropOpen(true);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleCropComplete = (file: File, previewUrl: string) => {
    setBannerPreview(previewUrl);
    setBanner(file);
  };

  const renderUploadBox = (  label: string,  preview: string | null,  onChange: any) => (
  <div>
    <label className="block text-sm font-medium text-primary mb-2">{label}</label>
    <div className="relative border-2 border-dashed border-primary flex flex-col items-center justify-center w-[176px] h-[130px] lg:w-[380px] lg:h-[158px] overflow-hidden">
      {preview ? (
        <img src={preview|| noimage} alt="upload" className="absolute inset-0 w-full h-full object-cover" 
        onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = noimage;
          }}/>
      ) : (
        <img src={upload} alt="upload" className="h-12 w-12 mb-8" />
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
        id={`file-${label}`}
      />
      <label
        htmlFor={`file-${label}`}
        className="absolute mt-[60px] bg-primary text-white px-3 py-1 rounded text-xs cursor-pointer"
      >
        {preview ? "Change" : "Upload"}
      </label>
    </div>
  </div>
);


  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 flex-wrap">
  <div className="flex flex-col">
    {renderUploadBox("Service Icon", iconPreview, handleIconChange)}
    {errors?.icon && <p className="text-red-500 text-xs mt-1">{errors.icon}</p>}
  </div>

  <div className="flex flex-col">
    {renderUploadBox("Service Banner", bannerPreview, handleBannerChange)}
    {errors?.banner && <p className="text-red-500 text-xs mt-1">{errors.banner}</p>}
  </div>
</div>

<div className="flex flex-col mt-6">
  {renderUploadBox("Service Photo", photoPreview, handlePhotoChange)}
  {errors?.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
</div>


      {bannerFile && cropOpen && (
        <ImageCropModal
          open={cropOpen}
          imageSrc={URL.createObjectURL(bannerFile)}
          originalName={bannerFile.name}
          onClose={() => setCropOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </>
  );
};

export default ServiceImages;
