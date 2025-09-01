import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name cannot exceed 100 characters"),
    description: z.string().min(1, "Detail is required").max(200, "Details cannot exceed 200 characters"),
    date: z.string().min(1, "Date is required"),
    deadline: z.string().min(1, "Deadline is required"),
    statusPercentage: z.string().min(1, "Status Percentage is required"),
    location: z.string().min(1, "Location is required").max(100, "Location cannot exceed 100 characters"),
    addProjectTo: z.string().min(1, "Please select where to add project")
}).refine((data) => {
    if (data.deadline && data.date) {
        return new Date(data.deadline) > new Date(data.date);
    }
    return true;
}, {
    message: "Deadline must be after the start date",
    path: ["deadline"],
});