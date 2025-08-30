import * as Yup from "yup";

export const serviceFormSchema = Yup.object().shape({
  serviceName: Yup.string()
    .min(3, "Service Name must be at least 3 characters")
    .max(20, "Service Name must be at most 20 characters")
    .required("Service Name is required"),

  serviceIcon: Yup.mixed().required("Service Icon is required"),
  serviceBanner: Yup.mixed().required("Service Banner is required"),
  servicePhoto: Yup.mixed().required("Service Photo is required"),

  serviceSubTitle: Yup.string()
    .min(3, "Sub Title must be at least 3 characters")
    .max(50, "Sub Title must be at most 50 characters")
    .required("Sub Title is required"),

  serviceSubDescription: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be at most 300 characters")
    .required("Description is required"),

  offers: Yup.array()
    .of(
      Yup.object().shape({
        heading: Yup.string()
          .min(3, "Offer Heading must be at least 3 characters")
          .max(50, "Offer Heading must be at most 50 characters")
          .required("Offer Heading is required"),
        description: Yup.string()
          .min(5, "Offer Description must be at least 5 characters")
          .max(300, "Offer Description must be at most 300 characters")
          .required("Offer Description is required"),
      })
    )
    .min(1, "At least one offer is required"),

  whyUsList: Yup.array()
    .of(
      Yup.object().shape({
        heading: Yup.string()
          .min(3, "Why Us Heading must be at least 3 characters")
          .max(50, "Why Us Heading must be at most 50 characters")
          .required("Why Us Heading is required"),
        description: Yup.string()
          .min(5, "Why Us Description must be at least 5 characters")
          .max(300, "Why Us Description must be at most 300 characters")
          .required("Why Us Description is required"),
      })
    )
    .min(1, "At least one Why Us is required"),
});
