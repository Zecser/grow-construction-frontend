import upload from "../../../assets/upload.png";
import { RefreshCw, Upload, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useAddPhoto } from "../hooks/useAddPhoto";
import { useState } from "react";

interface AddPhotoFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const AddPhotoForm: React.FC<AddPhotoFormProps> = ({ onCancel, onSuccess }) => {
  const {
    fileInputRef,
    preview,
    loading,
    error,
    handleFileChange,
    handleSubmit,
    removeImage,
  } = useAddPhoto();

  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full min-h-screen p-4">
      <Toaster />

      <button
        type="button"
        onClick={onCancel}
        className="absolute top-4 left-4 flex items-center gap-1 text-green-800 hover:text-primary z-10"
        disabled={loading}
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium  sm:inline">Back</span>
      </button>

      <form
        onSubmit={async (e) => {
          const success = await handleSubmit(e);
          if (success) {
            toast.success("Photo uploaded successfully!");
            removeImage();
            setTimeout(() => onSuccess(), 1000);
          }
        }}
        className="flex flex-col items-center p-4 md:p-8 lg:p-10 xl:p-12 mt-10"
      >
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-400 rounded p-3 mb-4 w-full max-w-md text-center">
            {error}
          </div>
        )}

        <div
          className="border-2 border-dashed border-primary flex items-center justify-center w-full max-w-md h-64 md:h-80 lg:h-96 bg-white rounded relative cursor-pointer"
          onClick={() => !preview && fileInputRef.current?.click()}
        >
          {!preview ? (
            <div className="flex flex-col items-center justify-center">
              {!imgError ? (
                <img
                  src={upload}
                  alt="upload icon"
                  className="h-16 w-16 mb-3"
                  onError={() => setImgError(true)}
                />
              ) : (
                <Upload className="w-10 h-10 text-primary mb-3" />
              )}

              <span className="bg-primary text-white px-6 py-2 rounded text-sm md:text-base">
                Upload
              </span>
            </div>
          ) : (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain rounded"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-700"
                title="Change Image"
              >
                <RefreshCw size={16} />
              </button>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading || !preview}
            className="bg-primary text-white px-6 py-2 rounded-md text-sm md:text-base disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Photo"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="bg-white border border-primary text-gray-700 px-6 py-2 rounded-md text-sm md:text-base disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPhotoForm;
