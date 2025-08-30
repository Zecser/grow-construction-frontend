import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { projectSchema } from "../validation/validationZod";

interface ProjectForm {
    name: string;
    date: string;
    description: string;
    status: string;
    statusPercentage?: number;
    location: string;
    addProjectTo: any;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate form data using Zod schema
        const result = projectSchema.safeParse(formData);
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(`${issue.path.join(".")}: ${issue.message}`);
            });
            setLoading(false);
            return;
        }

        setTimeout(() => {
            setLoading(false);
            toast.success("Project Saved Successfully!");

            // Navigate to project page after toast message
            setTimeout(() => {
                navigate("/admin/projects", { replace: true });
            }, 1500);
        }, 2000);
    };

    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
    };
};
