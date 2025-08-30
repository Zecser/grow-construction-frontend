import { useState } from "react";
import api from "../../../lib/api";

export const useDeletePhoto = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePhoto = async (id: number) => {
    setDeleting(true);
    setError(null); 
    try {
      await api.delete(`/gallery/${id}/`); 
      return { success: true };
    } catch (err: any) {
      console.error("Failed to delete photo:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete photo. Please try again.");
      }
      return { success: false };
    } finally {
      setDeleting(false);
    }
  };

  return { deletePhoto, deleting, error };
};
