import { useState } from "react";
import api from "../../../lib/api";
import { toast } from "react-hot-toast";

type UiStatus = "Ongoing" | "Completed" | "Upcoming";
type ApiStatus = "ongoing" | "completed" | "upcoming";
const toApiStatus = (s: UiStatus): ApiStatus =>
  (s || "Ongoing").toLowerCase() as ApiStatus;

type Values = {
  title: string;
  clientName: string;
  clientId: string;
  details: string;
  status: UiStatus;
  completion: number; 
  startDate: string | "";
  deadline: string | "";
  location: string;
  budget: string; 
};

type Errors = Partial<Record<keyof Values, string>>;
type Touched = Partial<Record<keyof Values, boolean>>;

const isIsoDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export const useAddReport = (onBack: () => void) => {
  const [values, setValues] = useState<Values>({
    title: "",
    clientName: "",
    clientId: "",
    details: "",
    status: "Ongoing",
    completion: 0,
    startDate: "",
    deadline: "",
    location: "",
    budget: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setValue = <K extends keyof Values>(key: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (touched[key]) validate({ ...values, [key]: val }, false);
  };

  const markTouched = (key: keyof Values) =>
    setTouched((t) => ({ ...t, [key]: true }));

  const validate = (v: Values, setState = true) => {
    const e: Errors = {};

    // required
    if (!v.title || !v.title.trim()) e.title = "Project name is required.";
    if (!v.clientName || !v.clientName.trim())
      e.clientName = "Client name is required.";
    if (!v.clientId || !v.clientId.trim())
      e.clientId = "Client ID is required.";
    if (!v.details || !v.details.trim()) e.details = "Details are required.";

    // status
    if (!["Ongoing", "Completed", "Upcoming"].includes(v.status))
      e.status = "Select a valid status.";

    // completion
    if (!Number.isFinite(Number(v.completion)))
      e.completion = "Completion must be a number.";
    else if (v.completion < 0 || v.completion > 100)
      e.completion = "Completion must be between 0 and 100.";

    // budget 
    const bn = Number(v.budget);
    if (v.budget === "" || !Number.isFinite(bn) || bn < 0)
      e.budget = "Budget is required and must be a non-negative number.";

    // dates 
    if (v.startDate && !isIsoDate(v.startDate))
      e.startDate = "Use format YYYY-MM-DD.";
    if (v.deadline && !isIsoDate(v.deadline))
      e.deadline = "Use format YYYY-MM-DD.";
    if (!e.startDate && !e.deadline && v.startDate && v.deadline) {
      if (v.startDate > v.deadline)
        e.deadline = "Deadline must be on/after start date.";
    }

    if (setState) setErrors(e);
    return { valid: Object.keys(e).length === 0, e };
  };

  const submit = async () => {
    if (submitting) return;

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
      location: true,
    });

    const { valid } = validate(values);
    if (!valid) return;

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        title: values.title.trim(),
        Client_name: values.clientName.trim(),
        Client_id: values.clientId.trim(),
        status: toApiStatus(values.status),
        completion: Math.max(0, Math.min(100, Number(values.completion) || 0)),
        start_date: values.startDate?.trim() ? values.startDate : null,
        deadline: values.deadline?.trim() ? values.deadline : null,
        location: values.location?.trim() || null,
        details: values.details.trim(),
        description: values.details.trim(),
        budget: Number(values.budget).toFixed(2),
      };

      await api.post("projects/", payload, {
        headers: { "Content-Type": "application/json" },
      });

      sessionStorage.setItem("reports:dirty", "1");
      toast.success("Project added");
      onBack();
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.statusText ||
        err?.message ||
        "Failed to add project.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    setValue,
    markTouched,
    errors,
    touched,
    submit,
    submitting,
    errorMessage,
  };
};
