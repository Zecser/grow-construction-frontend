import HeroSection from "@/components/sections/HeroSection";
import { AboutUsPage } from "../../features/about-us";

const AboutUs = () => {
  return (
    <div>
      <HeroSection
        heading="About"
        image="images/about.png"
        subheading={
          <>
            <p>
              We’re here to help you turn your vision into reality. Get in touch
              and let’s start building together.
            </p>
            <p className="text-sm mt-2 opacity-90">Home &gt; Contact Us</p>
          </>
        }
      />
      <AboutUsPage />
    </div>
  );
};

export default AboutUs;
