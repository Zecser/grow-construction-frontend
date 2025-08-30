export default function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-red-800 flex items-center justify-between gap-3">
      <span className="text-sm">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm px-2 py-1 rounded border border-red-400 hover:bg-red-100"
        >
          Retry
        </button>
      )}
    </div>
  );
}
