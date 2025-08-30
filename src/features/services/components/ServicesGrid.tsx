
import {
  FaHome, FaBuilding, FaIndustry, FaCoins, FaTools,
  FaProjectDiagram, FaClipboardCheck, FaHandshake,
  FaHammer, FaDraftingCompass, FaChartLine
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const services = [
  { id: 1, title: "Residential Construction", icon: <FaHome size={40} /> },
  { id: 2, title: "Commercial Construction", icon: <FaBuilding size={40} /> },
  { id: 3, title: "Industrial Construction", icon: <FaIndustry size={40} /> },
  { id: 4, title: "Cost estimation and budgeting", icon: <FaCoins size={40} /> },
  { id: 5, title: "Civil works", icon: <FaTools size={40} /> },
  { id: 6, title: "Project planning scheduling", icon: <FaProjectDiagram size={40} /> },
  { id: 7, title: "Permits and approvals assistance", icon: <FaClipboardCheck size={40} /> },
  { id: 8, title: "Construction Services General contracting", icon: <FaHandshake size={40} /> },
  { id: 9, title: "Interior and exterior finishing", icon: <FaHammer size={40} /> },
  { id: 10, title: "Structural steel and concrete works", icon: <FaDraftingCompass size={40} /> },
  { id: 11, title: "Site evaluation and feasibility studies", icon: <FaChartLine size={40} /> },
];

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center border rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <div className="text-green-800 mb-4">{service.icon}</div>
            <h3 className="text-lg font-bold text-center mb-2">{service.title}</h3>
            <button
              onClick={() => navigate(`/services/${service.id}`)}
              className="text-sm text-teal-500 hover:underline focus:outline-none"
            >
              Show more
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
