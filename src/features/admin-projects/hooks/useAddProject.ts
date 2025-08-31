import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { projectSchema } from "../validation/validationZod";
import api from "../../../lib/api";

interface ProjectForm {
    name: string;
    date: string;
    description: string;
    status: string;
    statusPercentage?: number;
    location: string;
    addProjectTo: string;
    clientName: string;
    clientId: string;
    deadline: string;
    budget?: number;
}

export const useAddProject = (initialState: ProjectForm) => {
    const [formData, setFormData] = useState<ProjectForm>(initialState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const mapAddProjectToStatus = (addProjectTo: string) => {
        switch (addProjectTo) {
            case "Ongoing Projects":
                return "ongoing";
            case "Upcoming Projects":
                return "upcoming";
            case "Completed Projects":
                return "completed";
            default:
                return "ongoing";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = projectSchema.safeParse(formData);
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(`${issue.path.join(".")}: ${issue.message}`);
            });
            setLoading(false);
            return;
        }
        try {
            const status = mapAddProjectToStatus(formData.addProjectTo);

            const payload = {
                title: formData.name,
                description: formData.description,
                location: formData.location,
                status: status.toLowerCase(),
                status_percentage: formData.statusPercentage || 0,
                start_date: formData.date,
                Client_name: formData.clientName,
                Client_id: formData.clientId,
                deadline: formData.deadline,
                budget: formData.budget,
            };

            await api.post("/projects/", payload);

            toast.success("Project Saved Successfully!");
            setTimeout(() => {
                navigate("/admin/projects", { replace: true });
            }, 1500);

        } catch (error: any) {
            console.error("API Error:", error.response?.data || error.message);
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "Failed to save project!";

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
    };
};
