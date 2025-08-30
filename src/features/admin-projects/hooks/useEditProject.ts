import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/lib/api";

interface ProjectForm {
    name: string;
    date: string;
    description: string;
    status: string;
    statusPercentage?: number;
    location: string;
    addProjectTo: string;
}

export const useEditProject = (id: string) => {
    const [formData, setFormData] = useState<ProjectForm>({
        name: "",
        description: "",
        date: "",
        status: "",
        statusPercentage: 0,
        location: "",
        addProjectTo: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                const response = await api.get(
                    `/projects/${id}/`,
                );
                const project = response.data;
                setFormData({
                    name: project.title,
                    description: project.description,
                    date: project.start_date,
                    status: project.status,
                    statusPercentage: project.status_percentage,
                    location: project.location,
                    addProjectTo:
                        project.status === "recent"
                            ? "Recent Projects"
                            : project.status === "upcoming"
                                ? "Upcoming Projects"
                                : "Completed Projects",
                });
            } catch (error) {
                toast.error("Failed to fetch project details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                title: formData.name,
                description: formData.description,
                location: formData.location,
                status: formData.status.toLowerCase(),
                status_percentage: formData.statusPercentage || 0,
                start_date: formData.date,
                budget: "1324355.00",
            };

            await api.put(
                `/projects/${id}/`,
                payload
            );

            toast.success("Project Updated Successfully!");

            setTimeout(() => {
                navigate("/admin/projects", { replace: true });
            }, 1500);

        } catch (error: any) {
            toast.error("Failed to update project.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
        setFormData,
    };
};
