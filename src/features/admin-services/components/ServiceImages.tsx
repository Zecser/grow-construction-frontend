// import { Upload } from "lucide-react";
import React, { useState } from "react";
import ImageCropModal from "./ImageCropModal";
import upload from "../../../assets/upload.png"

interface ServiceImagesProps {
  serviceIconPreview: string | null;
  setServiceIconPreview: React.Dispatch<React.SetStateAction<string | null>>;
  serviceBannerPreview: string | null;
  setServiceBannerPreview: React.Dispatch<React.SetStateAction<string | null>>;
  servicePhotoPreview: string | null;
  setServicePhotoPreview: React.Dispatch<React.SetStateAction<string | null>>;
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    fieldName: string
  ) => void;
  setServiceIcon: React.Dispatch<React.SetStateAction<File | null>>;
  setServiceBanner: React.Dispatch<React.SetStateAction<File | null>>;
  setServicePhoto: React.Dispatch<React.SetStateAction<File | null>>;
  errors: { [key: string]: string };
}

const ServiceImages: React.FC<ServiceImagesProps> = ({
  serviceIconPreview, setServiceIconPreview,
  serviceBannerPreview, setServiceBannerPreview,
  servicePhotoPreview, setServicePhotoPreview,
  handleImageChange, setServiceIcon, setServiceBanner, setServicePhoto,
  errors
}) => {

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [originalBannerName, setOriginalBannerName] = useState<string>("");

const handleBannerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       setOriginalBannerName(file.name);
      setTempImageSrc(URL.createObjectURL(file));
      setCropModalOpen(true);
    }
    e.target.value = "";
  };

  const handleBannerCropComplete = (file: File, previewUrl: string) => {
    setServiceBanner(file);                 
    setServiceBannerPreview(previewUrl); 
    if (tempImageSrc) URL.revokeObjectURL(tempImageSrc); 
    setTempImageSrc(null);
    setCropModalOpen(false);    

  };

  const handleBannerCancel = () => {
    if (tempImageSrc) URL.revokeObjectURL(tempImageSrc);
    setTempImageSrc(null);
    setCropModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 flex-wrap">
        {/* Service Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Icon</label>
          <div className="relative border-2 border-dashed border-primary flex flex-col items-center justify-center w-[176px] h-[130px] lg:w-[380px] lg:h-[158px] overflow-hidden">
            {serviceIconPreview ? (
              <img src={serviceIconPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              // <Upload className="h-8 w-8 text-primary mb-2" />
              <img src={upload} alt="" className="h-12 w-12 text-primary mb-8" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="serviceIcon"
              onChange={(e) => handleImageChange(e, setServiceIcon, setServiceIconPreview, "serviceIcon")}
            />
            <label
              htmlFor="serviceIcon"
              className="absolute mt-[60px] bg-primary text-white px-3 py-1 rounded text-xs cursor-pointer"
            >
              {serviceIconPreview ? "Change" : "Upload"}
            </label>
          </div>
          {errors.serviceIcon && (
            <span className="text-red-500 text-sm">{errors.serviceIcon}*</span>
          )}
        </div>

        {/* Service Banner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Banner</label>
          <div className="relative border-2 border-dashed border-primary flex flex-col items-center justify-center w-[176px] h-[130px] lg:w-[380px] lg:h-[158px] overflow-hidden">
            {serviceBannerPreview ? (
              <img src={serviceBannerPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              // <Upload className="h-8 w-8 text-primary mb-2" />
              <img src={upload} alt=""  className="h-12 w-12 text-primary mb-8" />

            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="serviceBanner"
              onChange={handleBannerSelect}
            />
            <label
              htmlFor="serviceBanner"
              className="absolute mt-[60px] bg-primary text-white px-3 py-1 rounded text-xs cursor-pointer"
            >
              {serviceBannerPreview ? "Change" : "Upload"}
            </label>
          </div>
          {errors.serviceBanner && (
            <span className="text-red-500 text-sm">{errors.serviceBanner}*</span>
          )}
        </div>
      </div>

      {/* Service Photo */}
      <div className="w-[176px] h-[130px] lg:w-[380px] lg:h-[158px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">Service Photo</label>
        <div className="relative border-2 border-dashed border-primary flex flex-col items-center justify-center w-full h-full overflow-hidden">
          {servicePhotoPreview ? (
            <img src={servicePhotoPreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            // <Upload className="h-8 w-8 text-primary mb-2" />
              <img src={upload} alt=""  className="h-12 w-12 text-primary mb-8"  />

          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="servicePhoto"
            onChange={(e) => handleImageChange(e, setServicePhoto, setServicePhotoPreview, "servicePhoto")}
          />
          <label
            htmlFor="servicePhoto"
            className="absolute mt-[60px] bg-primary text-white px-3 py-1 rounded text-xs cursor-pointer"
          >
            {servicePhotoPreview ? "Change" : "Upload"}
          </label>
        </div>
        {errors.servicePhoto && (
          <span className="text-red-500 text-sm ">{errors.servicePhoto}*</span>
        )}
      </div>

      {/* Crop Modal */}
      <ImageCropModal
        open={cropModalOpen}
        imageSrc={tempImageSrc}
        originalName={originalBannerName}
        onClose={handleBannerCancel}
        onCropComplete={handleBannerCropComplete}
      />
    </>
  );
}

export default ServiceImages;
