import type { DeleteReportModalProps } from "../types/reports";

export default function DeleteReportModal({
  isOpen,
  onClose,
  onConfirm,
  reportTitle,
  loading,
}: DeleteReportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Delete Project</h3>
        <p className="text-sm text-gray-700 mb-4">
          Are you sure you want to delete{" "}
          <span className="font-medium">{reportTitle}</span>? This action cannot
          be undone.
        </p>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            aria-disabled={loading}
            aria-busy={loading}
            className="
              px-4 py-2 rounded bg-red-600 text-white
              disabled:bg-gray-300 disabled:text-gray-500
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
