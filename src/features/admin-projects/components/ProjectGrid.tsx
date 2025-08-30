import ProjectCard from "./ProjectCard";
import { type Project } from "../../../data/project";

interface Props {
  projects: Project[];
  category?: string; // 👈 add category
}

const ProjectGrid = ({ projects, category }: Props) => (
  <div className="grid grid-cols-1 gap-4 justify-items-center sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} category={category} />
    ))}
  </div>
);

export default ProjectGrid;
