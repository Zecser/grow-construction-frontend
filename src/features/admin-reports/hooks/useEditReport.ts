import { useState } from "react";
import { toast } from "react-hot-toast";
import type { Report } from "../types/reports";
import api from "../../../lib/api";

type ApiStatus = "ongoing" | "completed" | "upcoming";
const toApi = (s: Report["status"]): ApiStatus => {
  const v = (s || "Ongoing").toLowerCase();
  if (v === "completed") return "completed";
  if (v === "upcoming") return "upcoming";
  return "ongoing";
};

type Errors = Partial<
  Record<
    | "title"
    | "status"
    | "completion"
    | "startDate"
    | "deadline"
    | "budget"
    | "clientId"
    | "clientName"
    | "details",
    string
  >
>;
type Touched = Partial<
  Record<
    | "title"
    | "status"
    | "completion"
    | "startDate"
    | "deadline"
    | "budget"
    | "clientId"
    | "clientName"
    | "details",
    boolean
  >
>;

const isIsoDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export const useEditReport = (initialReport: Report, onBack: () => void) => {
  const [report, setReport] = useState<Report>(initialReport);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});

  const handleChange = (field: keyof Report, value: any) => {
    setReport((prev) => ({ ...prev, [field]: value }));
    if (touched[field as keyof Touched])
      validate({ ...report, [field]: value } as Report, false);
  };

  const handleBlur = (field: keyof Touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const validate = (r: Report, setState = true) => {
    const e: Errors = {};

    if (!r.title || !r.title.trim()) e.title = "Title is required.";
    if (!r.clientName || !r.clientName.trim())
      e.clientName = "Client name is required.";
    if (!r.clientId || !r.clientId.trim())
      e.clientId = "Client ID is required.";
    if (!r.details || !r.details.trim()) e.details = "Details are required.";

    if (!["Ongoing", "Completed", "Upcoming"].includes(r.status))
      e.status = "Select a valid status.";

    if (!Number.isFinite(Number(r.completion)))
      e.completion = "Completion must be a number.";
    else if ((r.completion as number) < 0 || (r.completion as number) > 100)
      e.completion = "Completion must be between 0 and 100.";

    if (r.startDate && !isIsoDate(r.startDate))
      e.startDate = "Use format YYYY-MM-DD.";
    if (r.deadline && !isIsoDate(r.deadline))
      e.deadline = "Use format YYYY-MM-DD.";
    if (!e.startDate && !e.deadline && r.startDate && r.deadline) {
      if (r.startDate > r.deadline)
        e.deadline = "Deadline must be on/after start date.";
    }

    const bstr = r.budget ?? "";
    const bn = Number(bstr);
    if (bstr === "" || !Number.isFinite(bn) || bn < 0)
      e.budget = "Budget is required and must be a non-negative number.";

    if (setState) setErrors(e);
    return { valid: Object.keys(e).length === 0, e };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setTouched({
      title: true,
      status: true,
      completion: true,
      startDate: true,
      deadline: true,
      budget: true,
      clientId: true,
      clientName: true,
      details: true,
    });

    const { valid } = validate(report);
    if (!valid) return;

    setLoading(true);
    try {
      const budgetNum = Number(report.budget);
      const payload = {
        title: report.title.trim(),
        Client_id: report.clientId.trim(),
        Client_name: report.clientName.trim(),
        status: toApi(report.status),
        deadline: report.deadline?.trim() ? report.deadline : null,
        start_date: report.startDate?.trim() ? report.startDate : null,
        completion: Math.max(0, Math.min(100, Number(report.completion) || 0)),
        location: report.location?.trim() || null,
        details: report.details.trim(),
        description: report.details.trim(),
        budget: budgetNum.toFixed(2),
      };

      await api.patch(`projects/${report.id}/`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      sessionStorage.setItem("reports:dirty", "1");
      toast.success("Project updated");
      onBack();
    } catch (error: any) {
      const msg =
        error?.response?.data?.detail ||
        error?.response?.statusText ||
        error?.message ||
        "Failed to save project.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    report,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    errors,
    touched,
  };
};
