import { useEffect, useState } from "react";

interface WhyUsItem {
  heading: string;
  description: string;
}

interface Props {
  serviceId: number;
}

const WhyUsSection: React.FC<Props> = ({ serviceId }) => {
  const [whyUsList, setWhyUsList] = useState<WhyUsItem[]>([]);
  const [banner, setBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhyUs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/services/${serviceId}/`
        );
        if (!res.ok) throw new Error("Failed to fetch Why Us");
        const data = await res.json();
        setWhyUsList(Array.isArray(data.why_us_list) ? data.why_us_list : []);
        setBanner(data.service_banner || null);
      } catch (err) {
        console.error("Why Us fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyUs();
  }, [serviceId]);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Skeleton heading */}
          <div className="h-8 w-40 bg-gray-200 rounded mb-10 animate-pulse"></div>

          {/* Skeleton cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow p-6 animate-pulse"
              >
                <div className="h-5 w-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (whyUsList.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No Why Us section found.
      </div>
    );
  }

  return (
    <section
      className="py-16 px-4 bg-cover bg-center relative"
      style={{
        backgroundImage: banner
          ? `url(${banner})`
          : "linear-gradient(to right, #e6f7f1, #ffffff)",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Responsive heading */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-green-900 text-left">
          Why Us
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {whyUsList.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <h3 className="text-lg font-semibold mb-2 text-green-800">
                {item.heading}
              </h3>
              <p className="text-sm leading-6 text-gray-800">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
