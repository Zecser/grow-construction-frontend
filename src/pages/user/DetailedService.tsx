import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../../components/sections/HeroSection";
import ContactSection from "../../components/sections/ContactSection";
import ServiceHighlights from "../../features/service-details/components/ServiceHighlights";
import WhatWeOffer from "../../features/service-details/components/WhatWeOffer";
import WhyUsSection from "../../features/service-details/components/WhyUsSection";
import ImageWithPlaceholder from "../../components/sections/ImageWithPlaceholder";
import { ServicePageSkeleton } from "@/features/services";

const DetailedService = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/services/${id}/`
        );
        if (!res.ok) throw new Error("Failed to fetch service");
        const data = await res.json();
        setService(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return <ServicePageSkeleton />;
  }

  if (!service) {
    return (
      <div className="text-center py-20 text-xl text-gray-500">
        Service not found.
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900">
      <HeroSection
        heading={service.service_name}
        image={service.service_banner}
        subheading={<p>{service.service_sub_title}</p>}
        fallbackImage="/images/service.png"
      />

      <ServiceHighlights />

      <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10 items-center">
        <ImageWithPlaceholder
          src={service.service_photo}
          alt="Service"
          className="w-full max-w-md rounded-2xl shadow-lg"
          localStorageKey={`service_photo_${service.id}`}
        />
        <div className="border-2 border-dashed border-gray-300 rounded-2xl shadow-md p-8 bg-white">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            {service.service_sub_title}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            {service.service_sub_decs}
          </p>
        </div>
      </div>

      {/* Offers */}
      <WhatWeOffer serviceId={Number(id)} />

      {/* Why Us */}
      <WhyUsSection serviceId={Number(id)} />

      <ContactSection />
    </div>
  );
};

export default DetailedService;
