import GalleryPage from "../../features/admin-gallery/components/GalleryPage"
import Header from "../../features/admin-gallery/components/Header";
const Gallery = () => {
  return (
    <div className="w-full pl-[21px] pr-[22px] pb-[62px] pt-[15px]
                    sm:pl-[0px] sm:pr-[0px] sm:pb-[0px] 
                    md:pl-[21px] md:pr-[40px] md:pb-[30px]
                    lg:pl-[21px] lg:pr-[40px] lg:pb-[30px] ">
      <Header />
      <GalleryPage />
    </div>
  );
}

export default Gallery;
