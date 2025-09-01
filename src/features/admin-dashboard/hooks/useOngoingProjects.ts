import { useEffect, useMemo, useRef, useState } from "react";
import api from "../../../lib/api";
import type { OngoingProjectApi, BarItem } from "../types/types";
import { useInView } from "framer-motion";

export default function useOngoingProjects() {
  const [raw, setRaw] = useState<OngoingProjectApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [next, setNext] = useState<string | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref);

  const fetchOngoing = async (url?: string) => {
    setLoading(true);
    setErr(null);
    try {
      const { data } = await api.get(url || "projects/ongoing");
      const list: OngoingProjectApi[] = Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data)
          ? data
          : [];

      setRaw((prev) => [...prev, ...list]);
      setTotalCount(data?.count || list.length);
      setNext(data?.next || null);
    } catch (e: any) {
      setErr(
        e?.response?.data?.detail ||
        e?.response?.statusText ||
        e?.message ||
        "Failed to load ongoing projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoing();
  }, []);

  useEffect(() => {
    if (!loading && isInView && next && raw.length < totalCount) {
      fetchOngoing(next);
    }
  }, [isInView, loading, next, raw.length, totalCount]);

  const data: BarItem[] = useMemo(
    () =>
      (raw || []).map((p) => ({
        label: p.title || p.Client_name || "Untitled",
        value: Math.max(0, Math.min(100, Number(p.status_percentage ?? 0))),
      })),
    [raw]
  );


  return {
    data, loading, error, refetch: () => fetchOngoing(), totalCount, ref,
    hasNext: next,
    seeMore: () => next && fetchOngoing(next)
  };
}
