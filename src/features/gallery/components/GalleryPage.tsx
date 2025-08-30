import useFetchImages from "../hooks/useFetchImages"
import GalleryDetails from "./GalleryDetails"
import GalleryImages from "./GalleryImages"
import GalleryMainImage from "./GalleryMainImage"
import Loading from "./Loading"

const GalleryPage = () => {
    const { fetchDatas, isLoading, next, fetchData } = useFetchImages()

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    (
                        < >
                            <GalleryDetails />
                            <GalleryImages
                                fetchDatas={fetchDatas}
                                fetchNext={() => next && fetchData(next, true)}
                                hasNext={!!next}
                                isLoading={isLoading}
                            />
                            <GalleryMainImage />
                        </>
                    )
            }
        </>
    )
}

export default GalleryPage