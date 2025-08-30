import ProjectCard from "./ProjectCard.tsx";
import { type Project } from "../../../data/project";

interface Props {
  projects: Project[];
}

const ProjectGrid = ({ projects }: Props) => (
  <div className="grid grid-cols-1 gap-4 justify-items-center sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);

export default ProjectGrid;
