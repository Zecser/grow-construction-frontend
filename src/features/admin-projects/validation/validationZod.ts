import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name cannot exceed 100 characters"),
    description: z.string().min(1, "Detail is required").max(200, "Details cannot exceed 200 characters"),
    date: z.string().min(1, "Date is required"),
    // status: z.string().min(1, "Status is required"),
    statusPercentage: z.string().min(1, "Status Percentage is required"),
    location: z.string().min(1, "Location is required").max(100, "Location cannot exceed 100 characters"),
    addProjectTo: z.string().min(1, "Please select where to add project")
});