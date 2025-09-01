
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading?: boolean;
  errorMessage?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  errorMessage,
}) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    await onConfirm();
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
        onClick={() => {
          if (!loading) onClose();
        }}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-90 p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this?
          </p>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmModal;
