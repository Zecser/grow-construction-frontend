import { FaClipboardList, FaRegClock, FaCheckCircle } from "react-icons/fa";
import progress from "../../../assets/progress.png";
import StatsSkeleton from "./StatsSkeleton";
import ErrorBanner from "./ErrorBanner";
import type { ReportStatsProps } from "../types/reports";


const CardBox = ({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title: string;
}) => (
  <div
    role={onClick ? "button" : undefined}
    aria-label={title}
    onClick={onClick}
    className={`border-2 border-gray-700 rounded-lg p-3 sm:p-4 text-center ${
      onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""
    }`}
  >
    {children}
  </div>
);

export default function ReportStats({
  loading,
  totalProjects,
  completedProjects,
  ongoingProjects,
  avgCompletion,
  onFilterByStat,
  error,
  onRetry,
}: ReportStatsProps) {
  if (loading) return <StatsSkeleton />;

  return (
    <div>
      {error && <ErrorBanner message={error} onRetry={onRetry} />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <CardBox
          title="Total Projects"
          onClick={() => onFilterByStat?.("total")}
        >
          <p className="text-sm sm:text-md text-gray-700 font-bold mb-1 sm:mb-2">
            Total Projects
          </p>
          <div className="flex justify-center items-center gap-1 sm:gap-2">
            <FaClipboardList className="text-primary text-lg sm:text-xl" />
            <p className="text-lg sm:text-xl text-primary font-bold">
              {totalProjects}
            </p>
          </div>
        </CardBox>

        <CardBox
          title="Completed Projects"
          onClick={() => onFilterByStat?.("completed")}
        >
          <p className="text-sm sm:text-md text-gray-700 font-bold mb-1 sm:mb-2">
            Completed Projects
          </p>
          <div className="flex justify-center items-center gap-1 sm:gap-2">
            <FaCheckCircle className="text-primary text-lg sm:text-xl" />
            <p className="text-lg sm:text-xl text-primary font-bold">
              {completedProjects}
            </p>
          </div>
        </CardBox>

        <CardBox
          title="Ongoing Projects"
          onClick={() => onFilterByStat?.("ongoing")}
        >
          <p className="text-sm sm:text-md text-gray-700 font-bold mb-1 sm:mb-2">
            Ongoing Projects
          </p>
          <div className="flex justify-center items-center gap-1 sm:gap-2">
            <FaRegClock className="text-primary text-lg sm:text-xl" />
            <p className="text-lg sm:text-xl text-primary font-bold">
              {ongoingProjects}
            </p>
          </div>
        </CardBox>

        <div className="border-2 border-gray-700 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-sm sm:text-md text-gray-700 font-bold mb-1 sm:mb-2">
            Average Completion
          </p>
          <div className="flex justify-center items-center gap-1 sm:gap-2">
            <img src={progress} alt="progress" />
            <span className="text-lg sm:text-xl text-primary font-bold">
              {avgCompletion}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
