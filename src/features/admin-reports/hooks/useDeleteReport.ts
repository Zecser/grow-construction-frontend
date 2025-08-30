import { useState } from "react";
import api from "../../../lib/api";

// If you already have a Report type elsewhere, import and use it.
// Keeping it minimal here to avoid UI changes.
type MinimalReport = { id: string | number; title?: string };

export const useDeleteReport = () => {
  const [deleteReport, setDeleteReport] = useState<MinimalReport | null>(null);
  const [deloading, setDeloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = (report: MinimalReport) => {
    setError(null);
    setDeleteReport(report);
  };

  const cancelDelete = () => {
    setError(null);
    setDeleteReport(null);
  };

  const confirmDelete = async () => {
    if (!deleteReport) return;
    setDeloading(true);
    setError(null);
    try {
      // IMPORTANT: no leading slash → respects baseURL "/api"
      await api.delete(`projects/${deleteReport.id}/`);
      // parent component already refetches after this resolves
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.statusText ||
        e?.message ||
        "Delete failed";
      setError(msg);
      throw e; // let caller decide whether to toast, etc.
    } finally {
      setDeloading(false);
      setDeleteReport(null);
    }
  };

  return {
    deleteReport, // the selected report to delete (or null)
    handleDeleteClick, // call with a report to open the confirm modal
    confirmDelete, // performs DELETE /projects/:id/
    cancelDelete, // closes the confirm modal
    deloading, // loading flag for the delete action
    error, // last delete error (if any)
  };
};
