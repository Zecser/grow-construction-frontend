import { useState, useEffect } from "react";
import Pagination from "../../../components/buttons/Pagination";
import noimage from "../../../assets/noimage.jpg";
import { AlertTriangle} from "lucide-react";
import ServiceHeading from "./ServiceHeading";
import { useServices } from "../hooks/useServices";
import type { Service } from "../types";
import AddEditServiceForm from "./AddEditServiceForm";
import { useDeleteService } from "../hooks/useDeleteService";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ServiceSkeleton from "./ServiceSkeleton";

const ServiceLists: React.FC = () => {
  const [addingService, setAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const {
    services,
    loading,
    fetchServices,
    count,
    next,
    previous,
    pageSize,
    page,
    setPage,
    error,
  } = useServices();
  

  const {
    deleteService,
    loading: deleting,
    error: deleteError,
  } = useDeleteService(() => fetchServices(page));

  const totalPages = pageSize > 0 ? Math.ceil(count / pageSize) : 1;
  useEffect(() => {
    setTimeout(() => {

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 30);
  }, [page]);

  if (addingService) {
    return <AddEditServiceForm onCancel={() => setAddingService(false)} onSuccess={() => fetchServices(page)}  />;
  }

  if (editingService) {
    return (
      <AddEditServiceForm
        initialService={editingService}
        onCancel={() => setEditingService(null)}
        onSuccess={() => fetchServices(page)}
      />
    );
  }

  return (
    <>
      <ServiceHeading mode="list" />

      <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex justify-end md:justify-start mb-4">
          <button
            onClick={() => setAddingService(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/90 text-sm"
          >
            + Add Service
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[500px]">
            {Array.from({ length: pageSize || 6 }).map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        ) : (
          !error && (
            <div className="flex flex-col min-h-[500px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service: Service) => (
                  <div
                    key={`service-${service.id}`}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between relative"
                  >
                    <div className="flex justify-center ">
                      {service.service_icon ? (
                        <img
                          src={service.service_icon}
                          alt={service.service_name}
                          className="w-40 h-30 object-contain "
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = noimage;
                          }}
                        />
                      ) : (
                        <img
                          src={noimage}
                          alt="No Icon"
                          className="w-40 h-30 object-contain"
                        />
                      )}
                    </div>

                    <div className="text-center font-medium text-sm mb-10">
                      {service.service_name}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 absolute bottom-4 right-4">
                      <button
                        className="bg-primary text-white px-4 py-2 rounded-lg text-xs shadow hover:bg-primary/90"
                        onClick={() => setEditingService(service)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2  rounded-lg text-xs shadow hover:bg-red-600"
                        onClick={() => setDeleteTarget(service)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {!loading && (next || previous) && (
                <div className="mt-auto pt-6 flex justify-center">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    previous={!!previous}
                    next={!!next}
                    setPage={setPage}
                  />
                </div>
              )}
            </div>
          )
        )}
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (deleteTarget) {
            const success = await deleteService(deleteTarget.id);
            if (success) {
              setDeleteTarget(null);
              const newCount = count - 1;
              const newTotalPages = Math.max(1, Math.ceil(newCount / pageSize));
              const newPage = page > newTotalPages ? newTotalPages : page;
              await fetchServices(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            return success;
          }
          return false;
        }}
        loading={deleting}
        errorMessage={deleteError || undefined}
      />
    </>
  );
};

export default ServiceLists;
