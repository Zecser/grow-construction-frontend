const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5 w-full max-w-full min-h-[240px] flex flex-col animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
    <div className="h-9 bg-gray-300 rounded mt-auto w-24"></div>
  </div>
);

export default SkeletonCard;
