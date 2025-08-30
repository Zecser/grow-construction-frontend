import { useState } from "react";
import { toast } from "react-hot-toast";
import type { Report } from "../types";
// import api from "../../../lib/api";

export const useEditReport = (initialReport: Report, onBack: () => void) => {
  const [report, setReport] = useState<Report>(initialReport);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof Report, value: any) => {
    setReport((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
    //   const res= await api.put(`/reports/${report.id}`, report);
    await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(report);
      toast.success("save changes successfully!");
      setTimeout(() => onBack(), 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save report. Try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return {
    report,
    handleChange,
    handleSubmit,
    loading
  };
};
