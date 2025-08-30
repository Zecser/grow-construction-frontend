import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../lib/api";

export const useDeleteService = (fetchServices: () => Promise<void>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteService = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/services/${id}/`);
      toast.success("Service deleted successfully!");
      await fetchServices();
      return true;
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete service. Please try again.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteService, loading, error };
};
