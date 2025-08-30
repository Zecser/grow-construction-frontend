
import { useParams } from "react-router-dom";
import { serviceDetailsData } from "../../features/service-details/components/serviceDetails";
import WhyUsSection from "../../features/service-details/components/WhyUsSection";
import WhatWeOffer from "../../features/service-details/components/WhatWeOffer";
import ServiceHighlights from "../../features/service-details/components/ServiceHighlights";
import HeroSection from "../../components/sections/HeroSection"; // ✅ same reusable component
import ContactSection from "../../components/sections/ContactSection";
 // ✅ same image as Home

const DetailedService = () => {
  const { id } = useParams<{ id: string }>();
  const service = serviceDetailsData.find(item => item.id === Number(id));

  if (!service) {
    return (
      <div className="text-center py-20 text-xl text-gray-500">
        Service not found.
      </div>
    );
  }

  const { heroTitle, intro } = service;

  return (
    <div className="bg-white text-gray-900">
      {/* ✅ Reused Hero Section */}
      <HeroSection
        heading={heroTitle}
        image='../images/image.png' 
        subheading={
          <>
            <p>Building a sustainable future through innovative, efficient, and eco-friendly construction solutions that inspire progress.</p>
            <p className="text-sm mt-2 opacity-90">Services &gt; Service Details</p>
          </>
        }
      />

      <ServiceHighlights />

      {/* Intro Section */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10 items-center">
        <img src={intro.image} alt="Service" className="rounded shadow-lg" />
        <div>
          <h2 className="text-xl font-semibold text-primary mb-4">
            {intro.heading}
          </h2>
          <div className="border border-dashed border-primary p-4 rounded-md text-sm leading-6">
            {intro.paragraph}
          </div>
        </div>
      </div>

      <WhatWeOffer serviceId={service.id} />
      <WhyUsSection serviceId={service.id} />
      <ContactSection />
    </div>
  );
};

export default DetailedService;
