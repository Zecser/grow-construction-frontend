import { useState } from "react";
import { Trash2 } from "lucide-react";
import GalleryHeading from "./GalleryHeading";
import AddPhotoForm from "./AddPhotoForm";
import Pagination from "../../../components/buttons/Pagination";
import GallerySkeleton from "./GallerySkeleton";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useGallery } from "../hooks/useGallery";
import { useDeletePhoto } from "../hooks/useDeletePhoto";
import noimage from "../../../assets/noimage.jpg";
import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";

const GalleryLists = () => {
  const { gallery, loading, fetchGallery, next, previous, count, page, pageSize, error } = useGallery();
  const [addingGallery, setAddingGallery] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const { deletePhoto, deleting, error: deleteError } = useDeletePhoto();
  const totalPages = pageSize > 0 ? Math.ceil(count / pageSize) : 1;

  const handleSuccess = async () => {
    await fetchGallery(page);
    setAddingGallery(false);
  };

  if (addingGallery) {
    return (
      <>
        <GalleryHeading mode="add" />
        <AddPhotoForm
          onCancel={() => setAddingGallery(false)}
          onSuccess={handleSuccess}
        />
      </>
    );
  }

  return (
    <>
      <GalleryHeading mode="list" />

      <div className="p-2 sm:p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex w-full justify-end md:justify-start">
          <button
            onClick={() => setAddingGallery(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 text-sm"
          >
            + Add Photos
          </button>
        </div>
        {error &&
          <div className="flex flex-col items-center justify-center mt-10 max-w-4xl mx-auto my-28">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <p className="text-red-600 text-lg font-semibold mt-4 text-center">
              {error || "Photos not found."}
            </p>
          </div>
        }

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[500px]">
            {Array.from({ length: pageSize || 6 }).map((_, i) => (
              <GallerySkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col min-h-[500px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((g) => (
                <div
                  key={g.id}
                  className="relative group rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={g.photo}
                    alt={`Gallery ${g.id}`}
                    className="w-full h-64 object-cover bg-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = noimage;
                    }}
                  />
                  <button
                    onClick={() => setDeleteTarget(g.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600 disabled:opacity-50"
                    disabled={deleting}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {(next || previous) && (
              <div className="mt-auto pt-6 flex justify-center">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  previous={!!previous}
                  next={!!next}
                  setPage={async (newPage) => {
                    await fetchGallery(newPage);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (deleteTarget !== null) {
            const res = await deletePhoto(deleteTarget);
            if (res.success) {
              toast.success("Photo deleted successfully!");
              setDeleteTarget(null);
              setTimeout(async () => {
                const newCount = count - 1;
                const newTotalPages = Math.max(1, Math.ceil(newCount / pageSize))
                const newPage = page > newTotalPages ? newTotalPages : page;
                await fetchGallery(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 500);
            }
          }
        }}
        loading={deleting}
        errorMessage={deleteError || undefined}
      />


    </>
  );
};

export default GalleryLists;
