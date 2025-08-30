import React from "react";
import { ChevronLeft } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAddReport } from "../hooks/useAddReport";

interface AddReportPageProps {
  onBack: () => void;
}

const AddReportPage: React.FC<AddReportPageProps> = ({ onBack }) => {
  const { report, handleChange, handleSubmit, errors, loading } =
    useAddReport(onBack);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <Toaster />
      <p className="mb-6 text-[12px] sm:text-base md:text-[15px]">
        Create a new construction project report
      </p>
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="text-primary hover:text-primary/80">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-base md:text-lg font-semibold text-primary">
          ADD NEW REPORT
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm md:text-base">
        <div>
          <label className="block text-primary font-medium mb-1">
            Project Name
          </label>
          <input
            type="text"
            value={report.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
            focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2 text-xs md:text-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-primary font-medium mb-1">
            Client Name
          </label>
          <input
            type="text"
            value={report.clientName}
            onChange={(e) => handleChange("clientName", e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
            focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2 text-xs md:text-sm"
          />
          {errors.clientName && (
            <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
          )}
        </div>

        <div>
          <label className="block text-primary font-medium mb-1">Details</label>
          <textarea
            value={report.details}
            onChange={(e) => handleChange("details", e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
            focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2 text-xs md:text-sm"
          />
          {errors.details && (
            <p className="text-red-500 text-xs mt-1">{errors.details}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-primary font-medium mb-1">
              Status
            </label>
            <select
              value={report.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
              focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1 text-xs md:text-sm"
            >
              <option>Ongoing</option>
              <option>Completed</option>
              <option>On Hold</option>
              <option>Not Started</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
          </div>
          <div>
            <label className="block text-primary font-medium mb-1">
              Completion (%)
            </label>
            <input
              value={report.completion}
              onChange={(e) =>
                handleChange("completion", Number(e.target.value))
              }
              className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
              focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1 text-xs md:text-sm"
            />
            {errors.completion && (
              <p className="text-red-500 text-xs mt-1">{errors.completion}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-primary font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={report.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
              focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1 text-xs md:text-sm"
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
            )}
          </div>
          <div>
            <label className="block text-primary font-medium mb-1">
              Deadline
            </label>
            <input
              type="date"
              value={report.deadline}
              onChange={(e) => handleChange("deadline", e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
              focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1 text-xs md:text-sm"
            />
            {errors.deadline && (
              <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-primary font-medium mb-1">
              Client ID
            </label>
            <input
              type="text"
              value={report.clientId}
              onChange={(e) => handleChange("clientId", e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
              focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1 text-xs md:text-sm"
            />
            {errors.clientId && (
              <p className="text-red-500 text-xs mt-1">{errors.clientId}</p>
            )}
          </div>
          <div>
            <label className="block text-primary font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              value={report.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
              focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1 text-xs md:text-sm"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-primary font-medium mb-1">
            Add This Project To
          </label>
          <select
            value={report.category || ""}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-lg shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] 
            focus:outline-none focus:ring-1 focus:ring-primary px-3 py-2 text-xs md:text-sm"
          >
            <option value="">Select</option>
            <option>Recent Projects</option>
            <option>Archived Projects</option>
            <option>Favorites</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <button
            disabled={loading}
            type="submit"
            className="px-15 py-2 bg-primary text-white rounded-full text-sm md:text-base font-medium shadow-md hover:bg-primary/90"
          >
            {loading ? "Saving..." : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReportPage;
