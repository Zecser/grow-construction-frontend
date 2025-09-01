import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import {
  ProjectGrid,
  ProjectListHeader,
  SearchBar,
  SkeletonCard,
} from "../../features/admin-projects";

const PAGE_LIMIT = 12;

const ProjectListPage = () => {
  const { category } = useParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); //  search state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = "";
        if (category) {
          url = `/projects/${encodeURIComponent(category)}/?page=${page}&limit=${PAGE_LIMIT}`;
        } else {
          url = `/projects/?page=${page}&limit=${PAGE_LIMIT}`;
        }

        if (!url) return;

        const res = await api.get(url);

        // Safely get results array
        const results: any[] =
          res && res.data && Array.isArray(res.data.results) ? res.data.results : [];

        // Map with safe defaults
        const mapped = results.map((p: any) => ({
          id: p?.Client_id ?? "",
          projectName: p?.title ?? "",
          location: p?.location ?? "",
          status: p?.status ?? "",
          date: p?.start_date ?? null,
        }));

        // --- Ensure we only keep projects that belong to the current category (if status exists) ---
        let categoryScoped = mapped;
        if (category) {
          const catLower = category.toLowerCase();
          // Check if status field exists on any item
          const hasStatusField = mapped.some((m) => (m.status ?? "").toString().trim() !== "");
          if (hasStatusField) {
            categoryScoped = mapped.filter((m) =>
              (m.status ?? "").toString().toLowerCase().includes(catLower)
            );
          } // else: fallback to mapped (server likely returned already scoped list)
        }

        // --- Apply free-text search (only within the categoryScoped set) ---
        let finalProjects = categoryScoped;
        if (searchQuery && searchQuery.trim() !== "") {
          const q = searchQuery.trim().toLowerCase();
          finalProjects = categoryScoped.filter((p) => {
            const name = String(p.projectName || "").toLowerCase();
            const loc = String(p.location || "").toLowerCase();
            const status = String(p.status || "").toLowerCase();
            return name.includes(q) || loc.includes(q) || status.includes(q);
          });
        }

        setProjects(finalProjects);

        // Total pages: if there's no client-side filtering (i.e., empty searchQuery) prefer backend count
        const backendCount =
          res && res.data && typeof res.data.count === "number" ? res.data.count : undefined;

        if (!searchQuery || searchQuery.trim() === "") {
          setTotalPages(Math.max(1, Math.ceil((backendCount ?? finalProjects.length) / PAGE_LIMIT)));
        } else {
          // We filtered client-side; compute pages from filtered results
          setTotalPages(Math.max(1, Math.ceil(finalProjects.length / PAGE_LIMIT)));
        }
      } catch (err) {
        console.error("Project fetch error:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category, page, searchQuery]);

  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1) + " Projects"
    : "Projects";

  if (loading) {
    return (
      <div className="p-5 bg-white rounded-xl m-4 border-t-[5px] border-teal-900">
        <ProjectListHeader title={pageTitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="py-5 sm:p-5 bg-white rounded-xl m-4 border-t-[5px] border-teal-900">
      <ProjectListHeader title={pageTitle} />

      {/* Pass onSearch to SearchBar */}
      <SearchBar
        onSearch={(query) => {
          setSearchQuery(query);
          setPage(1); // reset page when searching
        }}
      />

      <ProjectGrid projects={projects} category={category} />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-teal-700 text-white disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-teal-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-teal-700 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectListPage;
