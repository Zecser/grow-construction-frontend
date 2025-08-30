import React from "react";
import { Toaster } from "react-hot-toast";

interface DeleteReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  reportTitle: string;
  loading: boolean
}

const DeleteReportModal: React.FC<DeleteReportModalProps> = ({ isOpen, onClose, onConfirm, reportTitle,loading }) => {
  if (!isOpen) return null;

  return (
    <>
    <Toaster/>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Delete Report</h2>
        <p className="mb-6">Are you sure you want to delete <strong>{reportTitle}</strong>?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
           
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DeleteReportModal;
