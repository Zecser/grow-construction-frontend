import { FaClipboardList, FaRegClock, FaCheckCircle } from "react-icons/fa";
import progress from "../../../assets/progress.png";
import StatsSkeleton from "./StatsSkeleton";

interface ReportStatsProps {
  loading: boolean;
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  avgCompletion: number;
}

const ReportStats = ({
  loading,
  totalProjects,
  completedProjects,
  ongoingProjects,
  avgCompletion,
}: ReportStatsProps) => {
  if (loading) return <StatsSkeleton />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
      <div className="border-2 border-gray-700 rounded-lg p-3 sm:p-4 text-center">
        <p className="text-sm sm:text-md text-gray-700 font-bold mb-1 sm:mb-2">
          Total Projects
        </p>
        <div className="flex justify-center items-center gap-1 sm:gap-2">
          <FaClipboardList className="text-primary text-lg sm:text-xl" />
          <p className="text-lg sm:text-xl text-primary font-bold">
            {totalProjects}
          </p>
        </div>
      </div>

      <div className="border-2 border-gray-700 rounded-lg p-3 sm:p-4 text-center">
        <p className="text-sm sm:text-md text-gray-700 font-bold mb-1 sm:mb-2">
          Completed Projects
        </p>
        <div className="flex justify-center items-center gap-1 sm:gap-2">
          <FaCheckCircle className="text-primary text-lg sm:text-xl" />
          <p className="text-lg sm:text-xl text-primary font-bold">
            {completedProjects}
          </p>
        </div>
      </div>

      <div className="border-2 border-gray-700 rounded-lg p-3 sm:p-4 text-center">
        <p className="text-sm sm:text-md text-gray-700 font-bold mb-1 sm:mb-2">
          Ongoing Projects
        </p>
        <div className="flex justify-center items-center gap-1 sm:gap-2">
          <FaRegClock className="text-primary text-lg sm:text-xl" />
          <p className="text-lg sm:text-xl text-primary font-bold">
            {ongoingProjects}
          </p>
        </div>
      </div>

      <div className="border-2 border-gray-700 rounded-lg p-3 sm:p-4 text-center">
        <p className="text-sm sm:text-md text-gray-700 font-bold mb-1 sm:mb-2">
          Average Completions
        </p>
        <div className="flex justify-center items-center gap-1 sm:gap-2">
          <img src={progress} alt="icon" />
          <span className="text-lg sm:text-xl text-primary font-bold">
            {avgCompletion}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportStats;
