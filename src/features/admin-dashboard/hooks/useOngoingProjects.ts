import { useEffect, useMemo, useState } from "react";
import api from "../../../lib/api";
import type { OngoingProjectApi, BarItem } from "../types/types";

export default function useOngoingProjects() {
  const [raw, setRaw] = useState<OngoingProjectApi[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<string | null>(null);

  const fetchOngoing = async () => {
    setLoading(true);
    setErr(null);
    try {
      const { data } = await api.get("projects/ongoing");
      const list: OngoingProjectApi[] = Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data)
        ? data
        : [];
      setRaw(list);
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

  const data: BarItem[] = useMemo(
    () =>
      (raw || []).map((p) => ({
        label: p.title || p.Client_name || "Untitled",
        value: Math.max(
          0,
          Math.min(100, Number(p.completion ?? p.status_percentage ?? 0))
        ),
      })),
    [raw]
  );

  return { data, loading, error, refetch: fetchOngoing };
}
