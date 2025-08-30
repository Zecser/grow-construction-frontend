import { useState, useMemo, useEffect } from "react";
import { reportsData as dummyReports } from "../data/reportsDummyData";
import type { Report } from "../types";
// import api from "../../../lib/api"; 

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>(dummyReports);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);

  // fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // const res = await api.get("/reports/"); //  endpoint
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const res = dummyReports;
        console.log(res);
        
        setReports(res); 
        
        // setReports(res.data?.results  || []);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // stats
  const totalProjects = reports.length;
  const completedProjects = reports.filter(r => r.status === "Completed").length;
  const ongoingProjects = reports.filter(r => r.status === "Ongoing").length;
  const avgCompletion = totalProjects
    ? Math.round(reports.reduce((acc, r) => acc + r.completion, 0) / totalProjects)
    : 0;

  // filtering
  const filteredReports: Report[] = useMemo(() => {
    return reports.filter((r) => {
      return (
        (statusFilter === "All Status" || r.status === statusFilter) &&
        (r.clientName.toLowerCase().includes(search.toLowerCase()) ||
          r.clientId.toLowerCase().includes(search.toLowerCase()) ||
          r.title.toLowerCase().includes(search.toLowerCase()))
      );
    });
  }, [search, statusFilter, reports]);

  const statusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Ongoing": return "bg-blue-100 text-blue-700";
      case "On Hold": return "bg-yellow-100 text-yellow-700";
      case "Not Started": return "bg-gray-200 text-gray-600";
      default: return "";
    }
  };

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    totalProjects,
    completedProjects,
    ongoingProjects,
    avgCompletion,
    filteredReports,
    statusColor,
    loading,
  };
};
