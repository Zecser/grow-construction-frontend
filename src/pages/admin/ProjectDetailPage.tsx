import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react"; // ✅ added Trash2
import api from "@/lib/api";
import toast from "react-hot-toast";
import { extractErrorMessages } from "@/utils/helpers/extractErrorMessage";

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

// Skeleton Component for Detail Page
function ProjectDetailSkeleton() {
  return (
    <div className="p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-300 rounded" />
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </div>
        <div className="h-8 w-20 bg-gray-300 rounded-lg" />
      </div>

      <div className="h-6 w-2/3 bg-gray-300 rounded mt-4" />
      <div className="h-4 w-1/2 bg-gray-300 rounded mt-2" />

      <div className="mt-6 grid grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 w-40 bg-gray-300 rounded" />
        ))}
      </div>

      <div className="mt-6">
        <div className="h-5 w-24 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded mt-1" />
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ category passed from ProjectCard
  const { category } = (location.state as { category?: string }) || {};

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}/`);
        setProject(res.data);
      } catch (err) {
        toast.error(extractErrorMessages(err) || "Error fetching project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleDelete = async () => {
    if (!projectId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/projects/${projectId}/`); // ✅ delete request
      navigate(category ? `/admin/projects/${category}` : "/admin/projects"); // ✅ go back after delete
    } catch (err) {
      toast.error(extractErrorMessages(err) ||"Failed to delete project");
    }
  };

  if (loading) return <ProjectDetailSkeleton />;
  if (!project) return <p className="p-4">Project not found</p>;

  return (
    <div className="p-6">
      {/* Back + Edit + Delete Buttons */}
      <div className="flex sm:items-center justify-between flex-col sm:flex-row mb-4">
        <div className="flex items-center text-lg ">
          <Link
            to={category ? `/admin/projects/${category}` : "/admin/projects"}
            className="text-[#54A18A] mr-2 no-underline flex items-center gap-2"
          >
            <span>←</span>
            <span className="text-[#54A18A]">Back To Projects</span>
          </Link>
        </div>
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
          <strong>Completion:</strong> {project.completion}%
        </div>
      </div>

      {project.details && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Details</h2>
          <p>{project.details}</p>
        </div>
      )}
      <div className="flex gap-2 justify-end py-2 sm:py-0 mt-3">
        {/* Edit Button */}
        <button
          onClick={() =>
            navigate(`/admin/projects/edit/${project.id}`, {
              state: { category },
            })
          }
          className="flex items-center gap-2 bg-[#54A18A] text-white px-3 py-2 rounded hover:bg-[#3d7c6a]"
        >
          <Pencil size={18} />
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
}
