import { useParams } from "react-router-dom";
import { allProjects, type Project } from "../../data/project";
import { ProjectGrid, ProjectListHeader, SearchBar } from "../../features/admin-projects";

const ProjectListPage = () => {
  const { category } = useParams();
  const filteredProjects = allProjects.filter((p: Project) => p.category === category);
  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1) + " Projects"
    : "Projects";

  return (
    <div className="p-5 bg-white rounded-xl m-4 border-t-[5px] border-teal-900">
      <ProjectListHeader title={pageTitle} />
      <SearchBar />
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
};

export default ProjectListPage;
