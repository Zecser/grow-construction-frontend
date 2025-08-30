import useFetchImages from "../hooks/useFetchImages"
import GalleryDetails from "./GalleryDetails"
import GalleryImages from "./GalleryImages"
import GalleryMainImage from "./GalleryMainImage"

const GalleryPage = () => {
    const { isLoading } = useFetchImages()
    return (
        <>
            {
                isLoading ?
                    (
                        <div className="flex justify-center items-center h-[200px]">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    ) :
                    (
                        <div className="py-6">
                            <GalleryDetails />
                            <GalleryImages />
                            <GalleryMainImage />
                        </div>
                    )
            }
        </>
    )
}

export default GalleryPage