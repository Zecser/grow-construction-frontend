import { useEffect, useRef } from "react";
import noImg from "../../../assets/noImg.jpg";
import type { ImageType } from "../hooks/useFetchImages";

interface GalleryProps {
  fetchDatas: ImageType[];
  fetchNext?: () => void;
  hasNext?: boolean;
  isLoading?: boolean;
}

const Gallery = ({
  fetchDatas,
  fetchNext,
  hasNext,
  isLoading,
}: GalleryProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fetchNext || !hasNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNext();
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [fetchNext, hasNext]);

  const getSpanClass = (index: number) => {
    if (index % 7 === 0) return "col-span-2 row-span-2";
    return "col-span-1 row-span-1";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div
        className="
          grid grid-cols-3 md:grid-cols-4
          auto-rows-[200px]
          gap-2
        "
      >
        {fetchDatas.map((item, index) => (
          <ImageParts
            key={item.id || index}
            src={item?.photo}
            spanClass={getSpanClass(index)}
          />
        ))}
      </div>

      {hasNext && <div ref={loaderRef} className="h-10" />}
      {isLoading && <p className="text-center py-4">Loading more images...</p>}
    </div>
  );
};

export default Gallery;

const ImageParts = ({
  src,
  spanClass,
}: {
  src?: string;
  spanClass?: string;
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-lg
        ${spanClass}
      `}
    >
      <img
        src={src || noImg}
        alt="gallery"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        onError={(e) => (e.currentTarget.src = noImg)}
      />
    </div>
  );
};
