import { Link } from "react-router-dom";
import noImg from '../../../assets/noImg.jpg'
import type React from "react";
import type { Service } from "../hooks/useServices";

interface ServicesProps {
  fetchServices?: Service[];
}

const OurServices: React.FC<ServicesProps> = ({ fetchServices = [] }) => {

  const services = fetchServices?.slice(0, 6)
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Our Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          services.length > 0 ?
            (
              services?.map((item: Service) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center p-6 border rounded-lg shadow-md transition-transform ease-in-out hover:scale-105 hover:shadow-lg transform duration-300"
                >
                  <div className="w-22 h-22 border-dashed border-2 border-green-600 rounded-full flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={item?.service_icon || noImg}
                      alt={item?.service_name || "Service"}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = noImg)}
                    />
                  </div>
                  <p
                    className="text-center text-md font-medium">
                    {item.service_name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center py-4">No Services Available</p>
            )
        }
      </div>

      {
        fetchServices?.length > 6 &&
        <div className="text-right my-2">
          <Link to={'/services'} className=" text-lg text-green-600">show more...</Link>
        </div>
      }
    </div>
  );
};

export default OurServices;
