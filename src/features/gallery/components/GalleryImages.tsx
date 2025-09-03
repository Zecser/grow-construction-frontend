import { useEffect, useRef } from "react";
import noImg from '../../../assets/noImg.jpg'
import type { ImageType } from "../hooks/useFetchImages";

interface GalleryProps {
  fetchDatas: ImageType[];
  fetchNext?: () => void;
  hasNext?: boolean;
  isLoading?: boolean;
}

const Gallery = ({ fetchDatas, fetchNext, hasNext, isLoading }: GalleryProps) => {
  const photos = fetchDatas.map((item) => item.photo);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Infinite scroll observer
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

  const groupImages = (arr: string[], chunkSize = 4) => {
    const groups: string[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  };

  const groupedImages = groupImages(photos);

  const mobilePattern = [
    [0, [1, 2]],
    [3, [4]],
    [[5, 6], 7],
    [8, [9, 10]],
    [11, [12]],
    [[13, 14], 15]
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 overflow-hidden">
      {/* Desktop layout */}
      <div className="hidden md:block space-y-6">
        {groupedImages.map((group, i) => {
          const [left, top, bottom, right] = group;
          return (
            <div key={i} className="flex gap-4 h-[500px] lg:h-[600px] xl:h-[800px]">
              {left && <img src={left} alt={`gallery-${i}-left`} className="w-1/3 h-full object-cover rounded-lg transition-transform duration-300 hover:scale-[102%]" onError={(e) => e.currentTarget.src = noImg} />}
              <div className="flex flex-col w-1/3 gap-2 h-full">
                {top && <img src={top} alt={`gallery-${i}-top`} className="flex-1 object-cover rounded-lg transition-transform duration-300 hover:scale-[102%]" onError={(e) => e.currentTarget.src = noImg} />}
                {bottom && <img src={bottom} alt={`gallery-${i}-bottom`} className="flex-1 object-cover rounded-lg transition-transform duration-300 hover:scale-[102%]" onError={(e) => e.currentTarget.src = noImg} />}
              </div>
              {right && <img src={right} alt={`gallery-${i}-right`} className="w-1/3 h-full object-cover rounded-lg transition-transform duration-300 hover:scale-[102%]" onError={(e) => e.currentTarget.src = noImg} />}
            </div>
          );
        })}
      </div>

      {/* Mobile layout */}
      <div className="block md:hidden space-y-4">
        {mobilePattern.map((pattern, i) => {
          const [col1, col2] = pattern;
          const col1Images = Array.isArray(col1) ? col1 : [col1];
          const col2Images = Array.isArray(col2) ? col2 : [col2];

          return (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col w-1/2 gap-2">
                {col1Images.map(idx => (
                  <img key={idx} src={photos[idx] || noImg} alt={`gallery-m-${idx}`} className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-[102%]" onError={(e) => e.currentTarget.src = noImg} />
                ))}
              </div>
              <div className="flex flex-col w-1/2 gap-2">
                {col2Images.map(idx => (
                  <img key={idx} src={photos[idx] || noImg} alt={`gallery-m-${idx}`} className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-[102%]" onError={(e) => e.currentTarget.src = noImg} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Loader div triggers infinite scroll */}
      {hasNext && <div ref={loaderRef} className="h-10" />}
      {isLoading && <p className="text-center py-4">Loading more images...</p>}
    </div>
  );
};

export default Gallery;
