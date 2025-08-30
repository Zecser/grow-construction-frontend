
import { useParams } from "react-router-dom";
import { serviceDetailsData } from "./serviceDetails";


const ServiceHighlights = () => {
  const { id } = useParams<{ id: string }>();
  const service = serviceDetailsData.find(item => item.id === Number(id));

  if (!service) return null;

  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 text-center">
        {service.highlights.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-sm">
            <span className="text-2xl">{item.icon}</span>
            <span className="mt-2 font-medium">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlights;
