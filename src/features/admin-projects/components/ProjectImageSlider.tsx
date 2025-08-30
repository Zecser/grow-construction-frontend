import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectImageSliderProps {
  images: string[];
  alt: string;
}

const ProjectImageSlider = ({ images, alt }: ProjectImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={alt}
        className="w-full rounded-lg object-cover max-h-[400px] md:max-h-[350px]"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ArrowRight size={18} />
          </button>
        </>
      )}

      {/* Green indicator dots */}
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectImageSlider;
