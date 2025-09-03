import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { extractErrorMessages } from "@/utils/helpers/extractErrorMessage";

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

export const useEditProject = (id: string) => {
    const [formData, setFormData] = useState<ProjectForm>({
        name: "",
        description: "",
        date: "",
        status: "",
        statusPercentage: 0,
        location: "",
        addProjectTo: "",
        clientName: "",
        clientId: "",
        deadline: "",
        budget: 0,
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
                        project.status === "ongoing"
                            ? "Ongoing Projects"
                            : project.status === "upcoming"
                                ? "Upcoming Projects"
                                : "Completed Projects",
                    clientName: project.Client_name,
                    clientId: project.Client_id,
                    deadline: project.deadline,
                    budget: project.budget,
                });
            } catch (error) {
                toast.error(extractErrorMessages(error) || "Failed to fetch project details.");
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
    const mapAddProjectToStatus = (addProjectTo: string) => {
        switch (addProjectTo) {
            case "Ongoing Projects":
                return "ongoing";
            case "Upcoming Projects":
                return "upcoming";
            case "Completed Projects":
                return "completed";
            default:
                return "recent";
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
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

            await api.put(
                `/projects/${id}/`,
                payload
            );
            toast.success("Project Updated Successfully!");
            navigate(`/admin/project/${id}`, { replace: true });

        } catch (error: any) {
            toast.error(extractErrorMessages(error)||"Failed to update project.");
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
