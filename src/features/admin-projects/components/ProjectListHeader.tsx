import { Link } from "react-router-dom";

interface Props {
  title: string;
}

const ProjectListHeader = ({ title }: Props) => (
  <div className="flex items-center gap-3 mb-4">
    <Link
      to="/admin/projects"
      className="text-2xl font-bold text-gray-800 no-underline"
    >
      &larr;
    </Link>
    <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
  </div>
);

export default ProjectListHeader;
