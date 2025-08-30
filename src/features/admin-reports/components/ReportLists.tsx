import { useState, useEffect } from "react";
import { useReports } from "../hooks/useReports";
import ReportSkeleton from "./ReportCardsSkeleton";
import ReportCards from "./ReportCards";
import ReportStats from "./ReportStats";
import AddReportPage from "./AddReportPage";
import Pagination from "./Pagination";
import { useDeleteReport } from "../hooks/useDeleteReport";
import DeleteReportModal from "./DeleteReportModal";
import EditReportModal from "./EditReport";
import type { Report } from "../types/reports";
import { Toaster } from "react-hot-toast";
import ReportControls from "./ReportControls"; 

export default function ReportLists() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filterByStat,
    totalProjects,
    completedProjects,
    ongoingProjects,
    avgCompletion,
    statsLoading,
    statsError,
    refetchStats,
    filteredReports,
    listLoading,
    listError,
    refetchList,
    skeletonCount,
    page,
    pageCount,
    goToPage,
    statusColor,
  } = useReports();

  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [addingReport, setAddingReport] = useState(false);

  const {
    deleteReport,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    deloading,
  } = useDeleteReport();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    const checkDirty = () => {
      if (sessionStorage.getItem("reports:dirty") === "1") {
        refetchList();
        refetchStats();
        sessionStorage.removeItem("reports:dirty");
      }
    };
    checkDirty();
    const onFocus = () => checkDirty();
    const onVisibility = () => {
      if (!document.hidden) checkDirty();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [refetchList, refetchStats]);

  if (addingReport) {
    return <AddReportPage onBack={() => setAddingReport(false)} />;
  }

  return (
    <>
      <Toaster />
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <p className="mb-6 text-[12px] sm:text-base md:text-[15px]">
          Monitor and manage all construction projects with real-time status
          updates
        </p>

        <ReportStats
          loading={statsLoading}
          totalProjects={totalProjects}
          completedProjects={completedProjects}
          ongoingProjects={ongoingProjects}
          avgCompletion={avgCompletion}
          onFilterByStat={filterByStat}
          error={statsError}
          onRetry={refetchStats}
        />

        <ReportControls
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={(v) => setStatusFilter(v as any)}
          onAddProject={() => setAddingReport(true)}
        />

        {listError && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700 text-sm">
            <div className="flex items-start justify-between gap-3">
              <span>{listError}</span>
              <button
                onClick={refetchList}
                className="shrink-0 px-3 py-1 rounded border border-red-300 bg-white text-red-700 text-xs hover:bg-red-50"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {listLoading ? (
            Array.from({ length: skeletonCount }).map((_, i) => (
              <ReportSkeleton key={i} />
            ))
          ) : filteredReports.length === 0 ? (
            <div className="text-center text-gray-500 py-12 border rounded bg-white">
              {search ? (
                <>
                  No projects found for{" "}
                  <span className="font-medium">“{search}”</span>.
                </>
              ) : (
                <>No projects found.</>
              )}
            </div>
          ) : (
            filteredReports.map((project) => (
              <ReportCards
                key={project.id}
                report={project}
                statusColor={statusColor}
                onEdit={(p: Report) => setEditingReport(p)}
                onDelete={handleDeleteClick}
              />
            ))
          )}
        </div>

        {!listLoading && filteredReports.length > 0 && pageCount > 1 && (
          <Pagination
            currentPage={page}
            totalPages={pageCount}
            onPageChange={goToPage}
          />
        )}
      </div>

      <DeleteReportModal
        isOpen={!!deleteReport}
        onClose={cancelDelete}
        onConfirm={async () => {
          if (deloading) return;
          try {
            await confirmDelete();
            await Promise.all([refetchList(), refetchStats()]);
          } catch {}
        }}
        reportTitle={deleteReport?.title || ""}
        loading={deloading}
      />

      {editingReport && (
        <EditReportModal
          report={editingReport}
          onBack={async () => {
            setEditingReport(null);
            await Promise.all([refetchList(), refetchStats()]);
          }}
        />
      )}
    </>
  );
}
