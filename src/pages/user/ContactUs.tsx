import React from "react";
import HeroSection from "../../components/sections/HeroSection";
import ContactSection from "../../components/sections/ContactSection";
import LeaveMessage from "../../components/sections/LeaveMessage";

const ContactUs: React.FC = () => {
  return (
    <div className="bg-white text-black">
      {/* ✅ Hero Section */}
      <HeroSection
        heading="Contact Us"
        image="images/image.png"
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

      {/* ✅ Leave Message */}
      <LeaveMessage />

      {/* ✅ Main Content */}
      <div className="px-4 md:px-20 pb-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Ready to Discuss Your Project
        </h2>
        <p className="text-gray-700 mb-4">
          Whether you're pursuing a residential build, a commercial space, or a
          custom design, our team is here to guide you.
        </p>

        <h3 className="text-lg font-semibold mb-2">
          Trusted Expertise, Reliable Support
        </h3>
        <p className="text-gray-700 mb-4">
          With deep industry knowledge and hands-on clarity and agility, we
          simplify the construction process for our clients.
        </p>

        <h3 className="text-lg font-semibold mb-2">
          Get in Touch with Confidence
        </h3>
        <p className="text-gray-700">
          Contact us today to explore how we can bring your project to life.
        </p>
      </div>

      {/* ✅ Contact Section */}
      <ContactSection />
    </div>
  );
};

export default ContactUs;
