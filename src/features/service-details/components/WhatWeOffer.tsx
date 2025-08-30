// src/features/services/WhatWeOffer.tsx
import React from "react";
import { serviceDetailsData } from "./serviceDetails";
serviceDetailsData

interface WhatWeOfferProps {
  serviceId: number;
}

const WhatWeOffer: React.FC<WhatWeOfferProps> = ({ serviceId }) => {
  const service = serviceDetailsData.find((item) => item.id === serviceId);

  if (!service) {
    return <div className="text-center py-10">No offers found for this service.</div>;
  }

  return (
    <div className="bg-white py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-lg text-primary font-semibold mb-6">What We Offer</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {service.offers.map((item, i) => (
          <div key={i} className="border rounded-md p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;
