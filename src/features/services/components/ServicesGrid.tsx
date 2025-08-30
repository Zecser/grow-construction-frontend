import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------- Interfaces ----------
interface Offer {
  heading: string;
  description: string;
}

interface Service {
  id: number;
  service_name: string;
  service_icon: string | null;
  service_banner: string | null;
  service_photo: string | null;
  service_sub_title: string;
  service_sub_decs: string;
  offers: Offer[];
}

// ---------- Image Component ----------
interface ImageWithPlaceholderProps {
  src: string | null;
  alt: string;
  className?: string;
  placeholder?: string;
  localStorageKey?: string;
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  alt,
  className = "",
  placeholder = "/images/w3.png",
  localStorageKey,
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);

  useEffect(() => {
    if (localStorageKey) {
      const stored = localStorage.getItem(localStorageKey);
      if (stored) setLocalImage(stored);
    }
  }, [localStorageKey]);

  const displaySrc =
    !error && src ? src : localImage ? localImage : placeholder;

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <img
            src={placeholder}
            alt="placeholder"
            className="w-8 h-8 opacity-60"
          />
        </div>
      )}
      <img
        src={displaySrc}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
          if (localStorageKey && src) {
            localStorage.setItem(localStorageKey, src);
          }
        }}
        onError={() => setError(true)}
        className={`object-contain w-full h-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

// ---------- Skeleton Card ----------
const ServiceCardSkeleton = () => (
  <div className="flex flex-col items-center border rounded-lg p-6 shadow animate-pulse">
    <div className="w-16 h-16 mb-4 bg-gray-300 rounded-md"></div>
    <div className="h-5 w-3/4 bg-gray-300 rounded mb-3"></div>
    <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
    <div className="h-4 w-20 bg-gray-300 rounded"></div>
  </div>
);

// ---------- Service Card ----------
const ServiceCard = ({ service }: { service: Service }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center border rounded-lg p-6 shadow hover:shadow-lg transition">
      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
        <ImageWithPlaceholder
          src={service.service_icon}
          alt={service.service_name}
          className="w-full h-full"
          localStorageKey={`service_icon_${service.id}`}
        />
      </div>

      <h3 className="text-lg font-bold text-center mb-2">
        {service.service_name}
      </h3>
      <p className="text-sm text-gray-600 text-center mb-3">
        {service.service_sub_title}
      </p>
      <button
        onClick={() => navigate(`/services/${service.id}`)}
        className="text-sm text-teal-500 hover:underline focus:outline-none"
      >
        Show more
      </button>
    </div>
  );
};

// ---------- Services Grid ----------
const ServicesGrid = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/services/?page=${currentPage}`
        );
        if (!res.ok) throw new Error("Failed to load services.");
        const data = await res.json();

        setServices(data.results || []);
        setTotalPages(Math.ceil(data.count / 12)); // ✅ backend count
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [currentPage]);

  if (error) {
    return (
      <section className="py-16 px-4 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))
          : services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default ServicesGrid;
