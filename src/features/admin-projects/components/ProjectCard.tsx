import { Link } from "react-router-dom";

interface Project {
  id: string | number;
  projectName: string;
  location: string;
  status: string;
  date: string;
}

interface Props {
  project: Project;
  category?: string; // 👈 add category
}

const ProjectCard = ({ project,category }: Props) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5 w-full max-w-full min-h-[240px] flex flex-col justify-between lg:max-w-[420px]">
    <div className="w-full flex-grow mx-auto text-left">
      <div className="flex mb-2 text-sm sm:text-base">
        <span className="text-teal-700 w-32 flex-shrink-0">Client ID</span>
        <span className="text-teal-700 flex-grow">: #{project.id}</span>
      </div>
      <div className="flex mb-2 text-sm sm:text-base">
        <span className="text-teal-700 w-32 flex-shrink-0">Project Name</span>
        <span className="text-teal-700 flex-grow">: {project.projectName}</span>
      </div>
      <div className="flex mb-2 text-sm sm:text-base">
        <span className="text-teal-700 w-32 flex-shrink-0">Location</span>
        <span className="text-teal-700 flex-grow">: {project.location}</span>
      </div>
      <div className="flex mb-2 text-sm sm:text-base">
        <span className="text-teal-700 w-32 flex-shrink-0">Project Status</span>
        <span className="text-teal-700 flex-grow">: {project.status}</span>
      </div>
      <div className="flex mb-2 text-sm sm:text-base">
        <span className="text-teal-700 w-32 flex-shrink-0">Date</span>
        <span className="text-teal-700 flex-grow">: {project.date}</span>
      </div>
    </div>

    {/* ✅ Now link includes category + id */}
    <Link to={`/admin/project/${project.id}`}
    state={{ category }}
 >
    
      <button className="px-4 py-2 rounded bg-teal-700 text-white">
        See More
      </button>
    </Link>
  </div>
);

export default ProjectCard;
