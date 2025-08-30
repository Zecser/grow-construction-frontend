import {  useState , useEffect} from "react";
import api from "../../../lib/api";
import type { GalleryItem } from "../type";

interface GalleryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GalleryItem[];
}

export const useGallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get<GalleryResponse>(`/gallery/?page=${page}`);
      const results = res.data.results || [];
      setGallery(results);
      setCount(res.data.count || 0);
      setNext(res.data.next);
      setPrevious(res.data.previous);
      setPage(page);


      if (results.length > 0 && pageSize === 0) {
        setPageSize(results.length);
      }
    } catch (err) {
     if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete Photo. Please try again.");
      } 
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchGallery(1);
  }, []);

  return { gallery, loading, fetchGallery, count, next, previous, page, pageSize,error };
};
