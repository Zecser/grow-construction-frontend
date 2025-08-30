import { useState } from "react";
import { toast } from "react-hot-toast";
import type { Report } from "../types";
// import api from "../../../lib/api";


export const useDeleteReport = (
  
) => {
  const [deleteReport, setDeleteReport] = useState<Report | null>(null);
  const [deloading, setdeLoading] = useState(false);

  const handleDeleteClick = (report: Report) => {
    setDeleteReport(report);
  };

  const confirmDelete = async () => {
    if (!deleteReport) return;

    setdeLoading(true);
    try {
    //   await api.delete(`/jobs/${deleteReport.id}/`);
     await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(deleteReport);

      setDeleteReport(null);
      toast.success(`Report deleted successfully!`);
   
    } catch (error: any) {
     if (error instanceof Error) {
        toast.error(error.message);
      }else {
        toast.error("Failed to delete report. Try again.");
      }
    } finally {
      setdeLoading(false);
    }
  };

  const cancelDelete = () => setDeleteReport(null);

  return {
    deleteReport,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    deloading,
  };
};
