import { baseURL } from "@/lib/api";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export type Service = {
  id: number;
  service_name?: string;
  service_icon: string;
};

const useServices = () => {
  const [fetchServices, setFetchServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getServices = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseURL}/services/`);      
      setFetchServices(res.data.results);
    } catch (error: any) {
      swal(error?.response?.data?.error || "Failed to fetch services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return { isLoading, fetchServices };
};

export default useServices;
