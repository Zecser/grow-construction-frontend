interface ProjectStatusProps {
  currentStatus: number;
}

const ProjectStatus = ({ currentStatus }: ProjectStatusProps) => {
  return (
    <div className="my-5">
      <p className="mb-2 text-gray-800">Current Status:</p>
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-300 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${currentStatus}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {currentStatus}% Completed
        </span>
      </div>
    </div>
  );
};

export default ProjectStatus;
