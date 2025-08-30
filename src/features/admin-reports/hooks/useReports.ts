import { useEffect, useMemo, useState, useCallback } from "react";
import api from "../../../lib/api";
import {
  type Report,
  type ProjectsListApi,
  type ReportsStatsApi,
  normalizeStatusUI,
  type StatusFilter,
  toApiStatus,
} from "../types/reports";

export const PER_PAGE = 12;

const mapToReport = (r: ProjectsListApi["results"][number]): Report => ({
  id: String(r.id),
  title: r.title ?? "",
  clientId: r.Client_id ?? "",
  clientName: r.Client_name ?? "",
  status: normalizeStatusUI(r.status),
  deadline: r.deadline ?? "",
  completion: Math.max(0, Math.min(100, Number(r.completion ?? 0))),
  details: r.details ?? "",
  startDate: r.start_date ?? "",
  location: r.location ?? "",
});

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Status");

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageCount = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  const [listLoading, setListLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const loading = listLoading || statsLoading;

  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    upcomingProjects: 0,
    avgCompletion: 0,
  });

  const refetchStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const { data } = await api.get<ReportsStatsApi>("projects/report/");
      setStats({
        totalProjects: data.total_projects ?? 0,
        completedProjects: data.completed_projects ?? 0,
        ongoingProjects: data.ongoing_projects ?? 0,
        upcomingProjects: data.upcoming_projects ?? 0,
        avgCompletion: Math.round(data.average_completion ?? 0),
      });
    } catch {
      setStatsError("Failed to load stats.");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchStats();
  }, [refetchStats]);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  const buildListRequest = () => {
    const params: Record<string, string | number> = {
      page,
      page_size: PER_PAGE,
    };
    let path = "projects/";

    const s = debouncedSearch.trim();
    if (s) {
      params.search = s;
    } else {
      const apiStatus = toApiStatus(statusFilter);
      if (apiStatus) path = `projects/${apiStatus}/`;
    }

    return { path, params };
  };

  const refetchList = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const { path, params } = buildListRequest();
      const { data } = await api.get<ProjectsListApi>(path, { params });
      const items = (data?.results ?? []).map(mapToReport);
      setReports(items);
      setTotalCount(Number(data?.count ?? items.length));
    } catch {
      setListError("Failed to load projects.");
      setReports([]);
      setTotalCount(0);
    } finally {
      setListLoading(false);
    }
  }, [page, debouncedSearch, statusFilter]);
  useEffect(() => {
    refetchList();
  }, [refetchList]);

  const filteredReports = useMemo(() => reports, [reports]);

  const statusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Ongoing":
        return "bg-blue-100 text-blue-700";
      case "Upcoming":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const filterByStat = (
    key: "total" | "completed" | "ongoing" | "upcoming"
  ) => {
    if (key === "total") setStatusFilter("All Status");
    if (key === "completed") setStatusFilter("Completed");
    if (key === "ongoing") setStatusFilter("Ongoing");
    if (key === "upcoming") setStatusFilter("Upcoming");
    setPage(1);
  };

  const nextPage = () => setPage((p) => Math.min(p + 1, pageCount));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const goToPage = (n: number) => setPage(Math.min(Math.max(1, n), pageCount));

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filterByStat,

    totalProjects: stats.totalProjects,
    completedProjects: stats.completedProjects,
    ongoingProjects: stats.ongoingProjects,
    avgCompletion: stats.avgCompletion,
    statsLoading,
    statsError,
    refetchStats,

    filteredReports,
    listLoading,
    listError,
    refetchList,

    page,
    pageCount,
    nextPage,
    prevPage,
    goToPage,

    statusColor,
    loading,
    skeletonCount: PER_PAGE,
  };
};
