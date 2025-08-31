import React, { useState, useEffect } from "react";

interface HeroSectionProps {
  image: string;
  fallbackImage?: string;
  heading: string;
  subheading: string | React.ReactNode;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  image,
  fallbackImage = "/images/service.png", 
  heading,
  subheading,
  className = "",
}) => {
  const [bgImage, setBgImage] = useState(image);

  useEffect(() => {
    const img = new Image();
    img.src = image;

    img.onload = () => setBgImage(image);
    img.onerror = () => setBgImage(fallbackImage);
  }, [image, fallbackImage]);

  return (
    <section
      className={`relative w-full aspect-[3/1] bg-cover bg-center flex items-center justify-center ${className}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative md:w-[90%] z-10 text-start text-white p-[30px]">
        <h1 className="text-3xl md:text-5xl mb-4 leading-tight max-w-xl">
          {heading}
        </h1>
        <div className="font-light text-sm md:text-lg max-w-2xl">
          {subheading}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
