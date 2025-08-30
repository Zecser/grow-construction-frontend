import { useState } from "react";
import api from "../../../lib/api";

export interface ServicePayload {
  id?: number;
  service_name: string;
  service_sub_title: string;
  service_sub_decs: string;
  service_icon: File | null;
  service_banner: File | null;
  service_photo: File | null;
  offers: { heading: string; description: string }[];
  why_us_list: { heading: string; description: string }[];
  status: "Active" | "Inactive";
}

export const useServiceForm = () => {
  const [loading, setLoading] = useState(false);
  const [Iserror, setIsError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitService = async (data: ServicePayload) => {
    setLoading(true);
    setIsError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("service_name", data.service_name);
      formData.append("service_sub_title", data.service_sub_title);
      formData.append("service_sub_decs", data.service_sub_decs);
      formData.append("status", data.status);

      if (data.service_icon) formData.append("service_icon", data.service_icon);
      if (data.service_banner)
        formData.append("service_banner", data.service_banner);
      if (data.service_photo)
        formData.append("service_photo", data.service_photo);

      data.offers.forEach((offer, index) => {
        formData.append(`offers[${index}]heading`, offer.heading);
        formData.append(`offers[${index}]description`, offer.description);
      });

      data.why_us_list.forEach((why, index) => {
        formData.append(`why_us_list[${index}]heading`, why.heading);
        formData.append(`why_us_list[${index}]description`, why.description);
      });

      let res;
      if (data.id) {
        res = await api.put(`/services/${data.id}/`, formData);
      } else {
        res = await api.post("/services/create/", formData);
      }
      setSuccess(true);
      return res.data;
    } catch (err: any) {
      if (err instanceof Error) {
        setIsError(err.message);
      } else {
        setIsError("Failed to submit service. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { submitService, loading, Iserror, success };
};
