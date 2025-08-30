import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StatsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="border-2 border-gray-200 rounded-lg p-3 sm:p-4 text-center"
      >
        <Skeleton height={20} width={80} className="mx-auto mb-2" />
        <Skeleton circle height={30} width={30} className="mx-auto" />
        <Skeleton height={20} width={40} className="mx-auto mt-2" />
      </div>
    ))}
  </div>
);

export default StatsSkeleton;
