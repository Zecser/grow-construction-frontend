import { useState, useRef, useEffect, useCallback } from "react";
import galleryImg1 from "../../../../public/images/galleryImg1.jpg";
import galleryImg2 from "../../../../public/images/galleryImg2.jpg";
import galleryImg3 from "../../../../public/images/galleryImg3.jpg";
import galleryImg4 from "../../../../public/images/galleryImg4.jpg";
import galleryImg5 from "../../../../public/images/galleryImg5.jpg";
import galleryImg6 from "../../../../public/images/galleryImg6.jpg";
import galleryImg7 from "../../../../public/images/galleryImg7.jpg";
import galleryImg8 from "../../../../public/images/galleryImg8.jpg";
import galleryImg9 from "../../../../public/images/galleryImg9.jpg";
import galleryImg10 from "../../../../public/images/galleryImg10.jpg";
import galleryImg11 from "../../../../public/images/galleryImg11.jpg";
import galleryImg12 from "../../../../public/images/galleryImg12.jpg";
import galleryImg13 from "../../../../public/images/galleryImg13.jpg";
import galleryImg14 from "../../../../public/images/galleryImg14.jpg";
import galleryImg15 from "../../../../public/images/galleryImg15.jpg";
import galleryImg16 from "../../../../public/images/galleryImg16.jpg";

const images = [
  galleryImg1, galleryImg2, galleryImg3, galleryImg4,
  galleryImg5, galleryImg6, galleryImg7, galleryImg8,
  galleryImg9, galleryImg10, galleryImg11, galleryImg12,
  galleryImg13, galleryImg14, galleryImg15, galleryImg16,
];

// Group images into sets of 4
function groupImages(imgArray: string[]) {
  const groups = [];
  for (let i = 0; i < imgArray.length; i += 4) {
    groups.push(imgArray.slice(i, i + 4));
  }
  return groups;
}

const Gallery = () => {
  const allGroups = groupImages(images);
  const [visibleGroups, setVisibleGroups] = useState(2); // show 2 groups at first
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer callback
  const loadMore = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleGroups((prev) => {
        if (prev < allGroups.length) {
          return prev + 1; // load next group
        }
        return prev;
      });
    }
  }, [allGroups.length]);

  // Setup observer
  useEffect(() => {
    const observer = new IntersectionObserver(loadMore, { threshold: 0.5 });
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMore]);

  return (
    <div className="max-w-[1400px] mx-auto p-4 space-y-6">
      {allGroups.slice(0, visibleGroups).map((group, i) => {
        const [left, top, bottom, right] = group;
        return (
          <div key={i} className="grid grid-cols-3 gap-4">
            {left && (
              <img src={left} alt="image" className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-103" />
            )}
            <div className="flex flex-col gap-4">
              {top && (
                <img src={top} alt="image" className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-103" />
              )}
              {bottom && (
                <img src={bottom} alt="image" className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-103" />
              )}
            </div>
            {right && (
              <img src={right} alt="image" className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-103" />
            )}
          </div>
        );
      })}

      {/* Loader target */}
      {visibleGroups < allGroups.length && (
        <div ref={loaderRef} className="text-center py-6 text-gray-500">
          Loading more...
        </div>
      )}
    </div>
  );
};

export default Gallery;
