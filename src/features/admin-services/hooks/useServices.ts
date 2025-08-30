import { useState, useEffect } from "react";
import api from "../../../lib/api";
import type { Service } from "../types";

interface ServicesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Service[];
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);

  const fetchServices = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<ServicesResponse>(`/services/?page=${pageNumber}`);
      const results = res.data.results || [];
      setServices(results);
      setCount(res.data.count || 0);
      setNext(res.data.next);
      setPrevious(res.data.previous);

      if (results.length > 0 && pageSize === 0) {
        setPageSize(results.length);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch services. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(page);
  }, [page]);

  return { services, loading, fetchServices, count, next, previous, page, setPage, pageSize, error };
};
