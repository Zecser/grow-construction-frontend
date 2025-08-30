import { useState, useEffect } from "react";
import ContactSection from "../../components/sections/ContactSection";
import HeroSection from "../../components/sections/HeroSection";
import LeaveMessage from "../../components/sections/LeaveMessage";
import AboutSection from "../../features/services/components/AboutSection";
import ServicesGrid from "../../features/services/components/ServicesGrid";

// Simple spinner component
// const Spinner = () => (
//   <div className="flex justify-center items-center h-64">
//     <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//     <span className="ml-3 text-gray-600 font-medium">Loading...</span>
//   </div>
// );

const Services = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API/data loading (replace with your API calls if needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        {/* <Spinner /> */}
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800">
      <HeroSection 
        heading="Our Professional Services" 
        image="../images/image.png"
        subheading={
          <>
            <p>Delivering high-quality services with a commitment to excellence and customer satisfaction.</p>
            <p className="text-sm mt-2 opacity-90">Home &gt; Services</p>
          </>
        }
      />
      <ServicesGrid />
      <AboutSection />
      <LeaveMessage />
      <ContactSection />
    </div>
  );
};

export default Services;
