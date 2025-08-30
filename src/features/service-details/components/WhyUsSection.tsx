// src/features/services/WhyUsSection.tsx
import React from "react";
import { serviceDetailsData } from "./serviceDetails";


interface WhyUsSectionProps {
  serviceId: number;
}

const WhyUsSection: React.FC<WhyUsSectionProps> = ({ serviceId }) => {
  const service = serviceDetailsData.find((item) => item.id === serviceId);

  if (!service) {
    return <div className="text-center py-10">No reasons found for this service.</div>;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-lg text-primary font-semibold mb-6">Why Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {service.whyUs.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-sm rounded-md p-4 text-center border border-gray-200"
            >
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;
