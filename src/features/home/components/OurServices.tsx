import { useState } from "react";
import servicesImg1 from "../../../../public/images/home/servicesImg1.png";
import servicesImg2 from "../../../../public/images/home/servicesImg2.png";
import servicesImg3 from "../../../../public/images/home/servicesImg3.png";
import servicesImg4 from "../../../../public/images/home/servicesImg4.png";
import servicesImg5 from "../../../../public/images/home/servicesImg5.png";
import servicesImg6 from "../../../../public/images/home/servicesImg6.png";
import servicesImg7 from "../../../../public/images/home/servicesImg7.png";
import servicesImg8 from "../../../../public/images/home/servicesImg8.png";
import servicesImg9 from "../../../../public/images/home/servicesImg9.png";
import servicesImg10 from "../../../../public/images/home/servicesImg10.png";
import servicesImg11 from "../../../../public/images/home/servicesImg11.png";
import { Button } from "../../../components/ui/button";

const servicesList = [
  { id: 1, image: servicesImg1, title: "Residential Construction" },
  { id: 2, image: servicesImg2, title: "Commercial Construction " },
  { id: 3, image: servicesImg3, title: "Industrial Construction  " },
  { id: 4, image: servicesImg4, title: "Cost estimation and budgeting " },
  { id: 5, image: servicesImg5, title: "Civil works " },
  { id: 6, image: servicesImg6, title: "Project planning scheduling" },
  { id: 7, image: servicesImg7, title: "Permits and approvals assistance " },
  { id: 8, image: servicesImg8, title: "Construction Services General contracting " },
  { id: 9, image: servicesImg9, title: "Interior and exterior finishing" },
  { id: 10, image: servicesImg10, title: "Structural steel and concrete works" },
  { id: 11, image: servicesImg11, title: "Site evaluation and feasibility studies" },
];

const OurServices = () => {
  const [showAll, setShowAll] = useState(false);

  // Show first 6 or all depending on state
  const displayedServices = showAll ? servicesList : servicesList.slice(0, 6);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Our Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedServices.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center p-4 border rounded-lg shadow-md transition-transform ease-in-out hover:scale-105 hover:shadow-lg transform duration-300"
          >
            <div className="w-15 h-15 p-2 border-dashed border-2 border-green-600 rounded-full flex items-center justify-center overflow-hidden mb-3">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-sm font-medium">{item.title.trim()}</p>
          </div>
        ))}
      </div>

      {/* Show More / Show Less button */}
      {servicesList.length > 6 && (
        <div className="text-center mt-6">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 text-white rounded-lg hover:bg-green-700 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OurServices;
