import { useState, useRef } from "react";
import toast from "react-hot-toast";
// import api from "../../../lib/api";

export const useAddPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [loading, setLoading] = useState(false);

  // File change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    if (selectedFiles.length) {
      setFiles((prev) => [...prev, ...selectedFiles]);

      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove a single image
  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) return toast.error("Please upload at least one photo.");

    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("photos", file));
      formData.append("status", status);

      // const res = await api.post("/api/gallery", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      toast.success("Photos uploaded successfully!");
      console.log([...formData.entries()]);

     handleReset(); 
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setPreviews([]);
    setStatus("active");
  };

  return {
    fileInputRef,
    previews,
    status,
    loading,
    handleFileChange,
    handleSubmit,
    handleReset,
    removeImage,
    setStatus,
  };
};
