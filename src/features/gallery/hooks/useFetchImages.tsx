import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { baseURL } from "@/lib/api";

export type ImageType = {
  id: number;
  photo: string;
  uploaded_at: string;
};

const useFetchImages = () => {
  const [fetchDatas, setFetchDatas] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [next, setNext] = useState<string | null>(null);

  const fetchData = async (
    url: string = `${baseURL}/gallery/`,
    append = false
  ) => {
    if (!url) return;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const newImages = response?.data?.results || [];
      setFetchDatas((prev) => (append ? [...prev, ...newImages] : newImages));
      setNext(response.data.next);
    } catch (error: any) {
      swal(error?.response?.data?.error || "Failed to fetch Gallery images");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { fetchDatas, isLoading, next, fetchData };
};

export default useFetchImages;
