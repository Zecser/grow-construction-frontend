import React from "react";

const SkeletonCard: React.FC = () => {
    return (
        <div className="shadow bg-gray-100 p-6 flex flex-col min-h-[210px] animate-pulse rounded-md">
            {/* Title */}
            <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>

            {/* List items */}
            <ul className="flex-1 mb-4 space-y-2">
                <li className="h-4 bg-gray-300 rounded"></li>
                <li className="h-4 bg-gray-300 rounded"></li>
                <li className="h-4 bg-gray-300 rounded w-2/3"></li>
            </ul>

            {/* Footer Button Placeholder */}
            <div className="h-4 w-24 bg-gray-300 rounded mt-auto"></div>
        </div>
    );
};

export default SkeletonCard;
