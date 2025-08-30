import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReportSkeleton = () => (
  <div className="border rounded-lg p-4 shadow-sm bg-white">
    <Skeleton height={20} width="40%" />

    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
      <Skeleton height={16} />
      <Skeleton height={16} />
      <Skeleton height={16} />
      <Skeleton height={16} />
      <Skeleton height={25} />
    </div>

    <div className="mt-4 flex items-center gap-2">
      <Skeleton height={12} width="70%" />
      <Skeleton height={14} width={30} />
    </div>

    <Skeleton height={16} width="60%" className="mt-3" />
  </div>
);

export default ReportSkeleton;
