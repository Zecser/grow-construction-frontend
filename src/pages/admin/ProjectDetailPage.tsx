import { useParams, Link } from "react-router-dom";
import { allProjects } from "../../data/project";
import {
  ProjectDownload,
  ProjectImageSlider,
  ProjectInfo,
  ProjectStatus,
} from "../../features/admin-projects";

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = allProjects.find((p) => p.id === projectId);

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div className="p-6 bg-[#f4f7f6] font-sans">
      {/* 🔹 Page Header */}
      <div className="flex flex-col items-start gap-5 mb-6">
        <h2 className="text-[20px] font-semibold text-[#116d4f]">Projects</h2>
        <Link
          to="/admin/projects"
          className="text-[#116d4f] text-[15px] font-medium hover:underline hover:text-[#219150]"
        >
          &lt; Show More
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl p-6 shadow-md max-w-[1000px] mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
          <div className="relative flex-1 md:max-w-[40%]">
            <ProjectImageSlider images={project.images} alt={project.projectName} />
          </div>

          <div className="flex-1.5 md:max-w-[60%]">
            <ProjectInfo {...project} />
            <ProjectStatus currentStatus={project.currentStatus} />
            <ProjectDownload url={project.projectPlanUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
