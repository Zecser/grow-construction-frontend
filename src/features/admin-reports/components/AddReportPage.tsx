import { useAddReport } from "../hooks/useAddReport";

export default function AddReportPage({ onBack }: { onBack: () => void }) {
  const {
    values,
    setValue,
    markTouched,
    errors,
    touched,
    submitting,
    submit,
    errorMessage,
  } = useAddReport(onBack);

  const completionDisplay =
    touched.completion || values.completion !== 0
      ? String(values.completion)
      : "0";

  const cls = (bad?: boolean) =>
    `mt-1 w-full border rounded px-3 py-2 ${
      bad ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        Create a new construction project report
      </h2>

      {errorMessage && (
        <div className="mb-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="space-y-4"
      >
        {/* Title */}
        <label className="text-sm block">
          <span className="text-gray-600">Project Name</span>
          <input
            className={cls(touched.title && !!errors.title)}
            value={values.title}
            onChange={(e) => setValue("title", e.target.value)}
            onBlur={() => markTouched("title")}
            aria-invalid={!!(touched.title && errors.title)}
            required
          />
          {touched.title && errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title}</p>
          )}
        </label>

        {/* Client Name */}
        <label className="text-sm block">
          <span className="text-gray-600">Client Name</span>
          <input
            className={cls(touched.clientName && !!errors.clientName)}
            value={values.clientName}
            onChange={(e) => setValue("clientName", e.target.value)}
            onBlur={() => markTouched("clientName")}
            aria-invalid={!!(touched.clientName && errors.clientName)}
            required
          />
          {touched.clientName && errors.clientName && (
            <p className="mt-1 text-xs text-red-600">{errors.clientName}</p>
          )}
        </label>

        {/* Details */}
        <label className="text-sm block">
          <span className="text-gray-600">Details</span>
          <textarea
            className={cls(touched.details && !!errors.details)}
            value={values.details}
            onChange={(e) => setValue("details", e.target.value)}
            onBlur={() => markTouched("details")}
            aria-invalid={!!(touched.details && errors.details)}
            required
          />
          {touched.details && errors.details && (
            <p className="mt-1 text-xs text-red-600">{errors.details}</p>
          )}
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Status */}
          <label className="text-sm block">
            <span className="text-gray-600">Status</span>
            <select
              className={cls(touched.status && !!errors.status)}
              value={values.status}
              onChange={(e) => setValue("status", e.target.value as any)}
              onBlur={() => markTouched("status")}
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

          {/* Completion */}
          <label className="text-sm block">
            <span className="text-gray-600">Completion (%)</span>
            <input
              inputMode="numeric"
              pattern="\d*"
              className={cls(touched.completion && !!errors.completion)}
              value={completionDisplay}
              onChange={(e) => {
                const digits = e.target.value.replace(/[^\d]/g, "");
                const norm = digits.replace(/^0+(?=\d)/, "");
                const n = Math.max(0, Math.min(100, Number(norm || 0)));
                setValue("completion", n);
              }}
              onBlur={() => markTouched("completion")}
              aria-invalid={!!(touched.completion && errors.completion)}
            />
            {touched.completion && errors.completion && (
              <p className="mt-1 text-xs text-red-600">{errors.completion}</p>
            )}
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Start Date */}
          <label className="text-sm block">
            <span className="text-gray-600">Start Date</span>
            <input
              type="date"
              className={cls(touched.startDate && !!errors.startDate)}
              value={values.startDate || ""}
              onChange={(e) => setValue("startDate", e.target.value)}
              onBlur={() => markTouched("startDate")}
              aria-invalid={!!(touched.startDate && errors.startDate)}
            />
            {touched.startDate && errors.startDate && (
              <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>
            )}
          </label>

          {/* Deadline */}
          <label className="text-sm block">
            <span className="text-gray-600">Deadline</span>
            <input
              type="date"
              className={cls(touched.deadline && !!errors.deadline)}
              value={values.deadline || ""}
              onChange={(e) => setValue("deadline", e.target.value)}
              onBlur={() => markTouched("deadline")}
              aria-invalid={!!(touched.deadline && errors.deadline)}
            />
            {touched.deadline && errors.deadline && (
              <p className="mt-1 text-xs text-red-600">{errors.deadline}</p>
            )}
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Client ID  */}
          <label className="text-sm block">
            <span className="text-gray-600">Client ID</span>
            <input
              className={cls(touched.clientId && !!errors.clientId)}
              value={values.clientId}
              onChange={(e) => setValue("clientId", e.target.value)}
              onBlur={() => markTouched("clientId")}
              aria-invalid={!!(touched.clientId && errors.clientId)}
              required
            />
            {touched.clientId && errors.clientId && (
              <p className="mt-1 text-xs text-red-600">{errors.clientId}</p>
            )}
          </label>

          {/* Location */}
          <label className="text-sm block">
            <span className="text-gray-600">Location</span>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              value={values.location}
              onChange={(e) => setValue("location", e.target.value)}
              onBlur={() => markTouched("location")}
            />
          </label>
        </div>

        {/* Budget */}
        <label className="text-sm block">
          <span className="text-gray-600">Budget</span>
          <input
            type="number"
            min={0}
            step="0.01"
            required
            className={cls(touched.budget && !!errors.budget)}
            value={values.budget}
            onChange={(e) => setValue("budget", e.target.value)}
            onBlur={() => markTouched("budget")}
            aria-invalid={!!(touched.budget && errors.budget)}
          />
          {touched.budget && errors.budget && (
            <p className="mt-1 text-xs text-red-600">{errors.budget}</p>
          )}
        </label>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            aria-disabled={submitting}
            aria-busy={submitting}
            className="
              px-6 py-2 rounded-full bg-primary text-white
              disabled:bg-gray-300 disabled:text-gray-500
              disabled:cursor-not-allowed
            "
          >
            {submitting ? "Adding..." : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
