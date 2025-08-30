import { FaEdit, FaTrash } from "react-icons/fa";

interface ReportCardProps {
  report: any;
  statusColor: (status: string) => string;
  onEdit: (report: any) => void;
  onDelete: (report: any) => void;
}

const ReportCards = ({
  report,
  statusColor,
  onEdit,
  onDelete,
}: ReportCardProps) => {
  return (
    <div
      key={report.id}
      className="border rounded-lg p-4 shadow-[0_1px_4px_-1px_rgba(0,0,0,0.4),0_-1px_4px_-1px_rgba(0,0,0,0.4)] bg-white relative"
    >
      <h2 className="font-semibold text-lg mb-3 truncate line-clamp-2">
        {report.title}
      </h2>
      
        {/* Mobile View */}
      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-4 md:hidden">
        <div className="col-span-2 flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <span className="font-semibold block text-[11px]">Client ID</span>
            <span className="whitespace-nowrap mt-1 block">
              {report.clientId}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-semibold block text-[11px]">Client Name</span>
            <span className="whitespace-nowrap mt-1 block truncate line-clamp-2">
              {report.clientName}
            </span>
          </div>

          <div className="flex gap-1 ml-auto">
            <button
              onClick={() => onEdit(report)}
              className="flex items-center justify-center w-8 h-8 text-gray-600 border rounded hover:bg-gray-100"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(report)}
              className="flex items-center justify-center w-8 h-8 text-red-600 border rounded hover:bg-gray-100"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <span className="font-semibold block text-[11px]">Deadline</span>
          <span className="whitespace-nowrap mt-1 block">
            {report.deadline}
          </span>
        </div>
        <div>
          <span className="font-semibold block text-[11px] mb-2">Status</span>
          <span
            className={`px-2 py-1 rounded-full text-[10px] font-medium ${statusColor(
              report.status
            )}`}
          >
            {report.status}
          </span>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-5 gap-3 text-sm text-gray-600 mb-4">
        <p>
          <span className="font-semibold block">Client ID</span>
          <span className="mt-1 block">{report.clientId}</span>
        </p>
        <p>
          <span className="font-semibold block ">Client Name</span>
          <span className=" mt-1 "> {report.clientName}</span>
        </p>
        <p>
          <span className="font-semibold block mb-1">Status</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(
              report.status
            )}`}
          >
            {report.status}
          </span>
        </p>
        <p>
          <span className="font-semibold block mb-1">Deadline</span>
          {report.deadline}
        </p>
        <p>
          <span className="font-semibold block mb-1">Actions</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(report)}
              className="flex items-center justify-center w-8 h-8 text-gray-600 border rounded hover:bg-gray-100"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(report)}
              className="flex items-center justify-center w-8 h-8 text-red-600 border rounded hover:bg-gray-100"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </p>
      </div>


      <div className="mb-3">
        <p className="text-sm font-medium mb-1">Completion</p>
        <div className="flex items-center gap-2 w-full md:w-1/3 sm:w-1/2">
          <div className="flex-1 bg-gray-300 rounded-full h-3">
            <div
              className="bg-[#78AF99] h-3 rounded-full"
              style={{ width: `${report.completion}%` }}
            ></div>
          </div>
          <span className="text-xs md:text-sm text-gray-800 font-medium">
            {report.completion}%
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700">
        <span className="font-medium">Details:</span> {report.details}
      </p>
    </div>
  );
};

export default ReportCards;
