import HeroSection from "@/components/sections/HeroSection";
import { GalleryPage } from "../../features/gallery";

const Gallery = () => {
  return (
    <>
      <HeroSection
        heading="Gallery"
        image="images/gallery.png"
        subheading={
          <>
            <p className="text-base mt-2 opacity-90">
              A glimpse into our moments, milestones, and memories captured in
              frames.
            </p>
            <p className="text-sm mt-2 opacity-90">Home &gt; Gallery</p>
          </>
        }
      />

      <GalleryPage />
    </>
  );
};

export default Gallery;
