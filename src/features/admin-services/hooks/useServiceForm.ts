import { useState } from "react";
import { toast } from "react-hot-toast";
import { serviceFormSchema } from "../utils/serviceFormvalidation";
// import api from "../../../lib/api"; 

export const useServiceForm = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceSubTitle, setServiceSubTitle] = useState("");
  const [serviceSubDescription, setServiceSubDescription] = useState("");

  const [offers, setOffers] = useState([{ heading: "", description: "" }]);
  const [whyUsList, setWhyUsList] = useState([{ heading: "", description: "" }]);

  const [status, setStatus] = useState("active");
  const [serviceIcon, setServiceIcon] = useState<File | null>(null);
  const [serviceBanner, setServiceBanner] = useState<File | null>(null);
  const [servicePhoto, setServicePhoto] = useState<File | null>(null);

  const [serviceIconPreview, setServiceIconPreview] = useState<string | null>(null);
  const [serviceBannerPreview, setServiceBannerPreview] = useState<string | null>(null);
  const [servicePhotoPreview, setServicePhotoPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  

const validateField = async (fieldName: string, value: any) => {
  try {
    const formData: any = {
      serviceName,
      serviceIcon,
      serviceBanner,
      servicePhoto,
      serviceSubTitle,
      serviceSubDescription,
      offers,
      whyUsList,
      status,
    };

    // Update only the specific field for validation
    if (fieldName.startsWith("offers[")) {
      const match = fieldName.match(/offers\[(\d+)\]\.(\w+)/);
      if (match) {
        const [, idx, key] = match;
        formData.offers[Number(idx)][key] = value;
      }
    } else if (fieldName.startsWith("whyUsList[")) {
      const match = fieldName.match(/whyUsList\[(\d+)\]\.(\w+)/);
      if (match) {
        const [, idx, key] = match;
        formData.whyUsList[Number(idx)][key] = value;
      }
    } else {
      formData[fieldName] = value;
    }

    await serviceFormSchema.validateAt(fieldName, formData);
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  } catch (err: any) {
    setErrors((prev) => ({ ...prev, [fieldName]: err.message }));
  }
};


  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview((prevPreview) => {
        if (prevPreview) URL.revokeObjectURL(prevPreview);
        return URL.createObjectURL(file);
      });
      validateField(fieldName, file);
    }
  };

  const addOffer = () => {
    setOffers([...offers, { heading: "", description: "" }]);
  };

  const addWhyUs = () => {
    setWhyUsList([...whyUsList, { heading: "", description: "" }]);
  };

  const removeOffer = (index: number) => {
    setOffers(offers.filter((_, i) => i !== index));
  };

  const removeWhyUs = (index: number) => {
    setWhyUsList(whyUsList.filter((_, i) => i !== index));
  };

  //  Full form validation on submit
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await serviceFormSchema.validate(
        {
          serviceName,
          serviceIcon,
          serviceBanner,
          servicePhoto,
          serviceSubTitle,
          serviceSubDescription,
          offers,
          whyUsList,
          status,
        },
        { abortEarly: false }
      );

      // All validations passed
      const formData = {
        serviceName,
        serviceSubTitle,
        serviceSubDescription,
        offers,
        whyUsList,
        status,
        serviceIcon,
        serviceBanner,
        servicePhoto,
      };

      try {
      //     const res = await api.post("/api/services", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
         console.log("Submitting form:", formData);
      toast.success("Service saved successfully!");
      handleCancel();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to save service. Please try again.");
      }
     
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      if (err.inner) {
        err.inner.forEach((e: any) => {
          if (e.path) newErrors[e.path] = e.message;
        });
      }
      setErrors(newErrors);
      toast.error("Please fix the errors in the form.");
    }
  };

  const handleCancel = () => {
    setServiceName("");
    setServiceSubTitle("");
    setServiceSubDescription("");
    setOffers([{ heading: "", description: "" }]);
    setWhyUsList([{ heading: "", description: "" }]);
    setStatus("active");
    setServiceIcon(null);
    setServiceBanner(null);
    setServicePhoto(null);
    setServiceIconPreview(null);
    setServiceBannerPreview(null);
    setServicePhotoPreview(null);
    setErrors({});
  };

  return {
    serviceName, setServiceName,
    serviceSubTitle, setServiceSubTitle,
    serviceSubDescription, setServiceSubDescription,
    offers, setOffers, addOffer, removeOffer,
    whyUsList, setWhyUsList, addWhyUs, removeWhyUs,
    status, setStatus,
    serviceIcon, setServiceIcon,
    serviceBanner, setServiceBanner,
    servicePhoto, setServicePhoto,
    serviceIconPreview, setServiceIconPreview,
    serviceBannerPreview, setServiceBannerPreview,
    servicePhotoPreview, setServicePhotoPreview,
    handleImageChange,
    handleSubmitForm,
    handleCancel,
    errors,
    validateField 
  };
};
