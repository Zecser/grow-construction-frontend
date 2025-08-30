import { useState, useRef } from "react";
import api from "../../../lib/api";

export const useAddPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a photo.");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("photo", file);

      await api.post("/gallery/", formData);

      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }else {
        setError("Failed to add photo. Please try again.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    fileInputRef,
    file,
    preview,
    loading,
    error,
    handleFileChange,
    handleSubmit,
    removeImage,
  };
};
