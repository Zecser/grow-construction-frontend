import { useEffect, useState } from "react";

interface Offer {
  heading: string;
  description: string;
}

interface Props {
  serviceId: number;
}

const WhatWeOffer: React.FC<Props> = ({ serviceId }) => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/services/${serviceId}/`
        );
        if (!res.ok) throw new Error("Failed to fetch offers");
        const data = await res.json();
        if (Array.isArray(data.offers)) {
          setOffers(data.offers);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOffers();
  }, [serviceId]);

  if (offers.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      {/* ⬇️ Heading smaller on mobile */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-green-900">
        What We Offer
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-primary mb-3">
              {offer.heading}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {offer.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeOffer;
