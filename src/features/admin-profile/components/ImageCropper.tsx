import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

interface ImageCropperProps {
  imageFile: File;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
}

export const getCroppedImg = async (imageSrc: string, crop: any) => {
  const image = await new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => resolve(img);
  });

  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );
  return canvas.toDataURL("image/png");
};

const ImageCropper: React.FC<ImageCropperProps> = ({ imageFile, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const imageURL = URL.createObjectURL(imageFile);

  const handleFinishCrop = useCallback(async () => {
    // 👇 For simplicity, just return full image for now
    // You can enhance later with real cropped area
    onCropComplete(imageURL);
  }, [imageURL, onCropComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg w-[90%] max-w-md">
        <div className="relative w-full h-64">
          <Cropper
            image={imageURL}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md">
            Cancel
          </button>
          <button onClick={handleFinishCrop} className="px-4 py-2 bg-green-600 text-white rounded-md">
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
