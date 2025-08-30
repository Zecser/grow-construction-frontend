
import ContactSection from "../../components/sections/ContactSection";
import HeroSection from "../../components/sections/HeroSection";
import LeaveMessage from "../../components/sections/LeaveMessage";
import AboutSection from "../../features/services/components/AboutSection";
import ServicesGrid from "../../features/services/components/ServicesGrid";

const Services = () => {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection 
      heading="Our Professional Services" 
      image='../images/image.png' 
       subheading={
          <>
            <p>Delivering high-quality services with a commitment to excellence and customer satisfaction..</p>
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
