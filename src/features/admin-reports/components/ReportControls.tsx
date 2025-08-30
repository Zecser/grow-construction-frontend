import { memo } from "react";
import { Search } from "lucide-react";
import type { ReportControlsProps } from "../types/reports";

function ReportControls({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onAddProject,
  className = "",
}: ReportControlsProps) {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center gap-4 w-full mb-10 ${className}`}
    >
      {/* Search */}
      <div className="w-full md:w-2/3 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Client name, ID, or project"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Status + Add */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end">
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusChange(
              e.target.value as
                | "All Status"
                | "Ongoing"
                | "Completed"
                | "Upcoming"
            )
          }
          className="w-full md:w-auto text-gray-600 text-sm text-center px-3 py-2 border border-gray-300 rounded-lg focus:outline-none shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] focus:ring-1 focus:ring-primary cursor-pointer"
        >
          <option>All Status</option>
          <option>Ongoing</option>
          <option>Completed</option>
          <option>Upcoming</option>
        </select>

        <button
          onClick={onAddProject}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 text-sm whitespace-nowrap"
        >
          + Add Project
        </button>
      </div>
    </div>
  );
}

export default memo(ReportControls);
