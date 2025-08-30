// src/features/admin-gallery/hooks/useGallery.ts
import { useState } from "react";
import { toast } from "react-hot-toast";
import type { ImageData } from "./galleryPage"; // Assuming ImageData type exists
import { dummyImages } from "./galleryPage";

export const useDeleteImage = () => {
    const [images, setImages] = useState<ImageData[]>(dummyImages);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const handleImageClick = (id: number) => {
        setSelectedImage(selectedImage === id ? null : id); // Toggle selection
    };

    const handleDelete = (id: string) => {
        setImages((prevImages) => prevImages.filter((img) => img.id !== id));
        toast.success("Image deleted successfully!");
    };

    return {
        images,
        selectedImage,
        handleImageClick,
        handleDelete,
    };
};
