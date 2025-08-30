import React from "react";

const GallerySkeleton: React.FC = () => {
  return (
    <div className="relative group rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-64 bg-gray-200"></div>
      <div className="absolute top-2 right-2 h-8 w-8 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default GallerySkeleton;
