import { useState } from "react";
import toast from "react-hot-toast";
import { reportSchema } from "../utils/reportValidation";
// import api from "../../../lib/api";

export const useAddReport = (onSuccess: () => void) => {
  const [report, setReport] = useState({
    title: "",
    clientName: "",
    details: "",
    status: "Ongoing",
    completion: 0,
    startDate: "",
    deadline: "",
    clientId: "",
    location: "",
    category: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // (runs on change)
  const validateField = async (field: string, value: any) => {
    try {
      await reportSchema.validateAt(field, { ...report, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  const handleChange = (field: string, value: any) => {
    setReport((prev) => ({ ...prev, [field]: value }));
    validateField(field, value); 
  };

  // (runs on submit)
  const validate = async () => {
    try {
      await reportSchema.validate(report, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((e: any) => {
        if (e.path) newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) {
      toast.error("Please fix the errors");
      return;
    }
    setLoading(true);
    try {
    // const res = await api.post("reports",)
    // console.log(res);
     await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Report added successfully!");
    setTimeout(() => onSuccess(), 2000);
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message || "Failed to add report. Try again.");
        }
    } finally {
        setLoading(false);
    }
  };

  return { report, handleChange, handleSubmit, errors,loading  };
};
