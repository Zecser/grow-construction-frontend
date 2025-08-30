import React from "react";
import heroImage from "../../../assets/hero-bg.jpg";

const ContactHero: React.FC = () => {
  return (
    <div className="relative w-full h-80">
      <img src={heroImage} alt="Contact Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-sm mt-2">Home &gt; Contact Us</p>
      </div>
    </div>
  );
};

export default ContactHero;
