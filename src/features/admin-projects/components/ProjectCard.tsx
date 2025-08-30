import { Link } from "react-router-dom";
import { type Project } from "../../../data/project";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => (
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
    <Link
      to={`/admin/projects/view/${project.id}`}
      className="block w-24 h-9 leading-9 mx-auto mt-4 text-center text-sm font-medium text-teal-700 border border-teal-700 rounded-lg transition-colors duration-200 hover:bg-teal-700 hover:text-white"
    >
      See More
    </Link>
  </div>
);

export default ProjectCard;
