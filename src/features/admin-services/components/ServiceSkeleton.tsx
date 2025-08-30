import React from "react";

const ServiceSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between relative animate-pulse">
      <div className="w-24 h-24 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-24 bg-gray-200 rounded mb-5"></div>
      <div className="flex gap-2 absolute bottom-4 right-4">
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default ServiceSkeleton;
