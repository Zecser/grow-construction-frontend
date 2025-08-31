import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import api from "@/lib/api";

interface Project {
  id: number;
  Client_name: string | null;
  Client_id: number | null;
  title: string;
  description: string;
  location: string;
  status: string;
  status_percentage: number;
  budget: string;
  start_date: string;
  deadline: string | null;
  end_date: string | null;
  completion: number;
  details: string | null;
}

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}/`);
        setProject(res.data);
      } catch  {
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (loading) return <p className="p-4">Loading project...</p>;
  if (!project) return <p className="p-4">Project not found</p>;

  return (
    <div className="p-6">
      {/* Back + Edit Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-lg">
          <Link
            to="/admin/projects"
            className="text-[#54A18A] mr-2 no-underline"
          >
            ←
          </Link>
          <span className="text-[#54A18A]">Back To Projects</span>
        </div>

        {/* Edit Button with Pen Icon */}
        <button
          onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
          className="flex items-center gap-2 bg-[#54A18A] text-white px-3 py-2 rounded-lg hover:bg-[#3d7c6a]"
        >
          <Pencil size={18} />
          Edit
        </button>
      </div>

      <h1 className="text-xl font-bold mt-4">{project.title}</h1>
      <p className="mt-2 text-gray-700">{project.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <strong>Location:</strong> {project.location}
        </div>
        <div>
          <strong>Status:</strong> {project.status} ({project.status_percentage}
          %)
        </div>
        <div>
          <strong>Client:</strong> {project.Client_name ?? "N/A"}
        </div>
        <div>
          <strong>Budget:</strong> ₹{project.budget}
        </div>
        <div>
          <strong>Start Date:</strong> {project.start_date}
        </div>
        <div>
          <strong>Deadline:</strong> {project.deadline ?? "N/A"}
        </div>
        <div>
          <strong>End Date:</strong> {project.end_date ?? "N/A"}
        </div>
        <div>
          <strong>Completion:</strong> {project.completion}%
        </div>
      </div>

      {project.details && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Details</h2>
          <p>{project.details}</p>
        </div>
      )}
    </div>
  );
}
