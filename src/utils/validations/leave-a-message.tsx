import { z } from "zod";

export const leaveMessageSchema = z.object({
  name: z.string()
    .min(1, "Name is required.")
    .max(30, "Name should not be greater than 30 characters."),

  contact_number: z.string()
    .regex(
      /^(\+?\d{10,15})$/,
      "Invalid contact number. Must be 10 to 15 digits, optionally starting with +."
    )
    .max(15, "Contact number should not exceed 15 characters."),

  location: z.string()
    .min(1, "Location is required.")
    .max(100, "Location should not exceed 100 characters."),

  email: z.string()
    .email("Invalid email address.")
    .max(100, "Email should not exceed 100 characters."),

  construction_type: z.string()
    .max(50, "Construction type should not exceed 50 characters.")
    .optional(),

  message: z.string()
    .min(1, "Message is required.")
    .max(1000, "Message should not exceed 1000 characters.")
});
