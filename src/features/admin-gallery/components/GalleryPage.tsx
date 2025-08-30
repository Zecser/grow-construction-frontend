import { Link } from "react-router-dom";
import { useDeleteImage } from "../hooks/deleteImage";
import { Toaster } from "react-hot-toast";

const GalleryPage: React.FC = () => {
    const { images, selectedImage, handleImageClick, handleDelete } = useDeleteImage();

    return (
        <div className="min-h-screen flex flex-col w-full pt-[10px] md:pt-[20px] lg:pt-[20px] xl:pt-[30px]">
            {/* Add Button */}
            <Link to="/admin/gallery/add" replace>
                <div className="flex items-center mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-primary sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <h4 className="font-normal text-sm sm:text-base md:text-lg lg:text-xl text-primary uppercase">
                        Add To Gallery
                    </h4>
                </div>
            </Link>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((img) => (
                    <div
                        key={img.id}
                        className="relative overflow-hidden shadow-md cursor-pointer"
                        onClick={() => handleImageClick(Number(img.id))}
                    >
                        <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-[195px] md:h-[225px] lg:h-[295px] xl:h-[292px] object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {selectedImage === Number(img.id) && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering image click
                                    handleDelete(img.id);
                                }}
                                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 hover:bg-black"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                        <Toaster position="top-right" reverseOrder={false} />
                    </div>
                ))}

            </div>
        </div>
    );
};

export default GalleryPage;

