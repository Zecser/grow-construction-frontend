import * as Yup from "yup";

export const reportSchema = Yup.object().shape({
  title: Yup.string()
    .required("Project name is required")
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters"),

  clientName: Yup.string()
    .required("Client name is required")
    .min(2, "Client name must be at least 2 characters"),

  details: Yup.string()
    .required("Details are required")
    .min(10, "Details must be at least 10 characters"),

  status: Yup.string().required("Status is required"),

  completion: Yup.number()
    .required("Completion is required"),

  startDate: Yup.string()
    .required("Start date is required"),

  deadline: Yup.string()
    .required("Deadline is required"),

  clientId: Yup.string()
  .required("Client ID is required")
  .min(2, "Client ID must be at least 2 characters")
  .max(10, "Client ID must be less than 10 characters"),

  location: Yup.string().required("Location is required"),

  category: Yup.string().required("Category is required"),
});
