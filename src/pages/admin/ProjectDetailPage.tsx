import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import api from "@/lib/api";
import DeleteConfirmModal from "@/features/admin-gallery/components/DeleteConfirmModal";

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
  completion: number;
}

// Skeleton Component for Detail Page
function ProjectDetailSkeleton() {
  return (
    <div className="p-4 sm:p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-300 rounded" />
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </div>
        <div className="h-8 w-20 bg-gray-300 rounded-lg" />
      </div>

      <div className="h-6 w-2/3 bg-gray-300 rounded mt-4" />
      <div className="h-4 w-1/2 bg-gray-300 rounded mt-2" />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
  const [deleting, setDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { category } = (location.state as { category?: string }) || {};

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}/`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const confirmDelete = async () => {
    if (!projectId) return;
    setDeleting(true);
    setDeleteError(null);

    try {
      await api.delete(`/projects/${projectId}/`);
      navigate(category ? `/admin/projects/${category}` : "/admin/projects");
    } catch (err) {
      console.error("Error deleting project", err);
      setDeleteError("Failed to delete project. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <ProjectDetailSkeleton />;
  if (!project) return <p className="p-4">Project not found</p>;

  return (
    <div className="p-4 sm:p-6">
      {/* Back + Edit + Delete Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="flex items-center text-lg">
          <Link
            to={category ? `/admin/projects/${category}` : "/admin/projects"}
            className="text-[#54A18A] mr-2 no-underline"
          >
            ←
          </Link>
          <span className="text-[#54A18A]">Back To Projects</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Edit Button */}
          <button
            onClick={() =>
              navigate(`/admin/projects/edit/${project.id}`, {
                state: { category },
              })
            }
            className="flex items-center justify-center gap-2 bg-[#54A18A] text-white px-3 py-2 rounded-lg hover:bg-[#3d7c6a] w-full sm:w-auto"
          >
            <Pencil size={18} />
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setDeleteOpen(true)}
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 w-full sm:w-auto"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      <h1 className="text-lg sm:text-xl font-bold mt-4">{project.title}</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <strong>Location:</strong> {project.location}
        </div>
        <div>
          <strong>Status:</strong> {project.status}
        </div>
        <div>
          <strong>Client Name:</strong> {project.Client_name ?? "N/A"}
        </div>
        <div>
          <strong>Client ID:</strong> {project.Client_id ?? "N/A"}
        </div>
        <div>
          <strong>Construction Details:</strong> {project.description ?? "N/A"}
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
          <strong>Completion:</strong> {project.status_percentage}%
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        loading={deleting}
        errorMessage={deleteError || undefined}
      />
    </div>
  );
}
