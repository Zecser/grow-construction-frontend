import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useReports } from "./hooks/useReports";
import ReportSkeleton from "./components/ReportCardsSkeleton";
import EditReportModal from "./components/EditReport";
import ReportCards from "./components/ReportCards";
import ReportStats from "./components/ReportStats";
import AddReportPage from "./components/AddReportPage";
import Pagination from "./components/Pagination";
import { useDeleteReport } from "./hooks/useDeleteReport";
import DeleteReportModal from "./components/DeleteReportModal";
import { Toaster } from "react-hot-toast";

const PAGE_SIZE = 4;

const ReportLists = () => {
  const {
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
  } = useReports();

  const [editingReport, setEditingReport] = useState<any>(null);
  const [addingReport, setAddingReport] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {  deleteReport, handleDeleteClick, confirmDelete, cancelDelete, deloading} = useDeleteReport();
  
  const totalPages = Math.ceil(filteredReports.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedReports = filteredReports.slice(start, start + PAGE_SIZE);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);


  if (editingReport) {
    return <EditReportModal report={editingReport} onBack={() => setEditingReport(null)} />;
  }
  if (addingReport) {
    return <AddReportPage onBack={() => setAddingReport(false)} />;
  }

  return (
    <>
    <Toaster/>
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <p className="mb-6 text-[12px] sm:text-base md:text-[15px]">
        Monitor and manage all construction projects with real-time status
        updates
      </p>

      <ReportStats
        loading={loading}
        totalProjects={totalProjects}
        completedProjects={completedProjects}
        ongoingProjects={ongoingProjects}
        avgCompletion={avgCompletion}
      />

      {!loading && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full mb-10">
          <div className="w-full md:w-2/3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Client name, ID, or project"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto text-gray-600 text-sm text-center px-3 py-2 border border-gray-300 rounded-lg focus:outline-none shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option>All Status</option>
              <option>Completed</option>
              <option>Ongoing</option>
              <option>On Hold</option>
              <option>Not Started</option>
            </select>

            <button
              onClick={() => setAddingReport(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 text-sm whitespace-nowrap" >
              + Add Project
            </button>
          </div>
        </div>
      )}


      <div className="space-y-4">
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => <ReportSkeleton key={i} />)
          : paginatedReports.map((report) => (
            <ReportCards
              key={report.id}
              report={report}
              statusColor={statusColor}
              onEdit={setEditingReport}
              onDelete={handleDeleteClick}
            />

          ))}
      </div>
      <DeleteReportModal
        isOpen={!!deleteReport}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        reportTitle={deleteReport?.title || ""}
        loading={deloading}
      />

      {!loading && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
       </>
  );
};

export default ReportLists;
