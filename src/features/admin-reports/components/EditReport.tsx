import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useEditReport } from "../hooks/useEditReport";
import type { UiStatus, Report } from "../types/reports";


export default function EditReport({
  report: initialReport,
  onBack,
}: {
  report: Report;
  onBack: () => void;
}) {
  const {
    report,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    errors,
    touched,
  } = useEditReport(initialReport, onBack);

  const [completionInput, setCompletionInput] = useState<string>("0");
  useEffect(() => {
    const n =
      typeof report?.completion === "number" &&
      Number.isFinite(report?.completion)
        ? report.completion
        : 0;
    setCompletionInput(String(n));
  }, [report?.completion]);

  const onCompletionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^\d]/g, "");
    const normalized = digits.replace(/^0+(?=\d)/, "");
    setCompletionInput(normalized);
    const num = Math.max(0, Math.min(100, Number(normalized || 0)));
    handleChange("completion", num);
  };
  const onCompletionBlur = () => {
    handleBlur("completion");
    const num = Math.max(0, Math.min(100, Number(completionInput || 0)));
    setCompletionInput(String(num));
    handleChange("completion", num);
  };

  if (!report) return null;

  const cls = (bad?: boolean) =>
    `mt-1 w-full border rounded px-3 py-2 ${
      bad ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <Toaster />
      <div className="w-full max-w-lg rounded-xl bg-white p-4 sm:p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Edit Project</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title  */}
          <label className="text-sm block">
            <span className="text-gray-600">Title</span>
            <input
              className={cls(touched.title && !!errors.title)}
              value={report.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              onBlur={() => handleBlur("title")}
              aria-invalid={!!(touched.title && errors.title)}
              required
            />
            {touched.title && errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </label>

          {/* Client fields  */}
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm block">
              <span className="text-gray-600">Client ID</span>
              <input
                className={cls(touched.clientId && !!errors.clientId)}
                value={report.clientId || ""}
                onChange={(e) => handleChange("clientId", e.target.value)}
                onBlur={() => handleBlur("clientId")}
                aria-invalid={!!(touched.clientId && errors.clientId)}
                required
              />
              {touched.clientId && errors.clientId && (
                <p className="mt-1 text-xs text-red-600">{errors.clientId}</p>
              )}
            </label>
            <label className="text-sm block">
              <span className="text-gray-600">Client Name</span>
              <input
                className={cls(touched.clientName && !!errors.clientName)}
                value={report.clientName || ""}
                onChange={(e) => handleChange("clientName", e.target.value)}
                onBlur={() => handleBlur("clientName")}
                aria-invalid={!!(touched.clientName && errors.clientName)}
                required
              />
              {touched.clientName && errors.clientName && (
                <p className="mt-1 text-xs text-red-600">{errors.clientName}</p>
              )}
            </label>
          </div>

          {/* Status + Deadline */}
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm block">
              <span className="text-gray-600">Status</span>
              <select
                className={cls(touched.status && !!errors.status)}
                value={(report.status as UiStatus) || "Ongoing"}
                onChange={(e) =>
                  handleChange("status", e.target.value as UiStatus)
                }
                onBlur={() => handleBlur("status")}
                aria-invalid={!!(touched.status && errors.status)}
              >
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Upcoming</option>
              </select>
              {touched.status && errors.status && (
                <p className="mt-1 text-xs text-red-600">{errors.status}</p>
              )}
            </label>

            <label className="text-sm block">
              <span className="text-gray-600">Deadline</span>
              <input
                type="date"
                className={cls(touched.deadline && !!errors.deadline)}
                value={report.deadline || ""}
                onChange={(e) => handleChange("deadline", e.target.value)}
                onBlur={() => handleBlur("deadline")}
                aria-invalid={!!(touched.deadline && errors.deadline)}
              />
              {touched.deadline && errors.deadline && (
                <p className="mt-1 text-xs text-red-600">{errors.deadline}</p>
              )}
            </label>
          </div>

          {/* Start + Location */}
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm block">
              <span className="text-gray-600">Start Date</span>
              <input
                type="date"
                className={cls(touched.startDate && !!errors.startDate)}
                value={report.startDate || ""}
                onChange={(e) => handleChange("startDate", e.target.value)}
                onBlur={() => handleBlur("startDate")}
                aria-invalid={!!(touched.startDate && errors.startDate)}
              />
              {touched.startDate && errors.startDate && (
                <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>
              )}
            </label>

            <label className="text-sm block">
              <span className="text-gray-600">Location</span>
              <input
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                value={report.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
                onBlur={() => handleBlur("details")}
              />
            </label>
          </div>

          {/* Completion */}
          <label className="text-sm block">
            <span className="text-gray-600">Completion (%)</span>
            <input
              inputMode="numeric"
              pattern="\d*"
              min={0}
              max={100}
              className={cls(touched.completion && !!errors.completion)}
              value={completionInput}
              onChange={onCompletionChange}
              onBlur={onCompletionBlur}
              aria-invalid={!!(touched.completion && errors.completion)}
            />
            {touched.completion && errors.completion && (
              <p className="mt-1 text-xs text-red-600">{errors.completion}</p>
            )}
          </label>

          {/* Details  */}
          <label className="text-sm block">
            <span className="text-gray-600">Details</span>
            <textarea
              className={cls(touched.details && !!errors.details)}
              value={report.details || ""}
              onChange={(e) => handleChange("details", e.target.value)}
              onBlur={() => handleBlur("details")}
              aria-invalid={!!(touched.details && errors.details)}
              required
            />
            {touched.details && errors.details && (
              <p className="mt-1 text-xs text-red-600">{errors.details}</p>
            )}
          </label>

          {/* Budget  */}
          <label className="text-sm block">
            <span className="text-gray-600">Budget</span>
            <input
              type="number"
              min={0}
              step="0.01"
              className={cls(touched.budget && !!errors.budget)}
              value={report.budget ?? ""}
              onChange={(e) => handleChange("budget", e.target.value)}
              onBlur={() => handleBlur("budget")}
              aria-invalid={!!(touched.budget && errors.budget)}
              required
            />
            {touched.budget && errors.budget && (
              <p className="mt-1 text-xs text-red-600">{errors.budget}</p>
            )}
          </label>

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded border"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              aria-busy={loading}
              className="
                px-4 py-2 rounded bg-primary text-white
                disabled:bg-gray-300 disabled:text-gray-500
                disabled:cursor-not-allowed disabled:shadow-none
              "
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
