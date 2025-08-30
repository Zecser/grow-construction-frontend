import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage"; 
import { Dialog } from "@headlessui/react";

interface ImageCropModalProps {
  open: boolean;
  imageSrc: string | null;
  originalName?: string;
  onClose: () => void;
  onCropComplete: (file: File, previewUrl: string) => void;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({ open, imageSrc,originalName= "banner.jpg", onClose, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (newCrop: any) => setCrop(newCrop);
  const onZoomChange = (newZoom: number) => setZoom(newZoom);
  const onCropCompleteHandler = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
     const file = new File([croppedBlob], originalName, { type: "image/jpeg" });
    const previewUrl = URL.createObjectURL(croppedBlob);
    onCropComplete(file, previewUrl);
    onClose();
   
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg p-4 w-[90vw] max-w-2xl">
          <div className="relative w-full h-[300px] bg-gray-200">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={3 / 1} // fixed 3:1 ratio
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropCompleteHandler}
              />
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button onClick={handleSave} className="px-3 py-1 bg-primary text-white rounded">OK</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageCropModal;
