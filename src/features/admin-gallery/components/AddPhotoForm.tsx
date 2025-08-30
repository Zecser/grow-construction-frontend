import {  X } from "lucide-react";
import upload from "../../../assets/upload.png"
import { Toaster } from "react-hot-toast";
import { useAddPhoto } from "../hooks/useAddPhoto";

const AddPhotoForm = () => {
  const {
    fileInputRef,
    previews,
    status,
    loading,
    handleFileChange,
    handleSubmit,
    handleReset,
    removeImage,
    setStatus,
  } = useAddPhoto();

  return (
    <>
      <Toaster position="top-right" />

      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-8 lg:p-10 xl:p-12 mt-10"
      >
        <div className="flex flex-col gap-6">

          {/* Upload Field */}
          <div className="w-[176px] h-[130px] lg:w-[380px] lg:h-[158px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo To Upload
            </label>
            <div
              className="border-2 border-dashed border-primary flex flex-col items-center justify-center w-full h-full bg-white rounded cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {/* <Upload className="h-8 w-8 text-primary mb-2" /> */}
              <img src={upload} alt="" className="h-12 w-12 text-primary mb-3" />
              <span className="bg-primary text-white px-4 py-1 rounded text-sm">
                Upload
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Preview Thumbnails */}
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8 ">
              {previews.map((src, idx) => (
                <div key={idx} className="relative w-28 h-28">
                  <img
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover rounded border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Status Radio Buttons */}
          <div className="w-full max-w-[866px] mt-10">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex space-x-6 mt-8 ml-5">
              {["active", "inactive"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 capitalize">
                    {option}
                  </span>
                  <input
                    type="radio"
                    name="status"
                    value={option}
                    checked={status === option}
                    onChange={() =>
                      setStatus(option as "active" | "inactive")
                    }
                    className="appearance-none w-4 h-4 border-2 border-primary rounded-full checked:bg-white checked:border-[5px] checked:border-primary focus:outline-none cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 mb-20">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded-md text-sm sm:text-base"
            >
              {loading ? "Saving..." : "Save To Gallery"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-white border border-primary text-gray-700 px-10 py-2 rounded-md text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPhotoForm;
