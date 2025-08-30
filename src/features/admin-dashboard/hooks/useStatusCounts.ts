import { useEffect, useState, useMemo } from "react";
import api from "../../../lib/api";
import type { StatusCountsApi, BarItem } from "../types/types";

const parsePercent = (v?: string): number => {
  if (!v) return 0;
  const n = Number(String(v).replace("%", "").trim());
  return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0;
};

export default function useStatusCounts() {
  const [raw, setRaw] = useState<StatusCountsApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<string | null>(null);

  const fetchCounts = async () => {
    setLoading(true);
    setErr(null);
    try {
      const { data } = await api.get("projects/status-counts/");
      setRaw(data);
    } catch (e: any) {
      setErr(
        e?.response?.data?.detail ||
          e?.response?.statusText ||
          e?.message ||
          "Failed to load status counts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const data: BarItem[] = useMemo(() => {
    if (!raw) return [];
    return [
      { label: "Upcoming", value: parsePercent(raw.upcoming) },
      { label: "Ongoing", value: parsePercent(raw.ongoing) },
      { label: "Completed", value: parsePercent(raw.completed) },
      { label: "Recent", value: parsePercent(raw.recent) },
    ];
  }, [raw]);

  return { data, loading, error, refetch: fetchCounts };
}
