// components/ContactSection.tsx

import { FaHeadset } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { CONTACT } from "../../utils/constants";

const ContactSection = () => {
  return (
    <div className="flex justify-center items-center bg-white py-8 px-4">
      <div className="relative w-full  border-y-4 border-green-800 clip-custom p-8 ">
        <div className="flex flex-col md:flex-row justify-between mx-auto max-w-6xl gap-8 bg-white">
          <div className="flex items-start gap-4">
            <div className="relative">
              <span className="w-10 h-10 bg-green-300 rounded-full absolute -top-1 -left-1"></span>
              <FaHeadset size={40} className="relative z-10" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p className="text-sm">{CONTACT.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative">
              <span className="w-10 h-10 bg-green-300 rounded-full absolute -top-1 -left-1"></span>
              <HiOutlineMail size={40} className="relative z-10" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Mail Us</h3>
              <p className="text-sm">{CONTACT.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative">
              <span className="w-10 h-10 bg-green-300 rounded-full absolute -top-1 -left-1"></span>
              <MdLocationOn size={40} className="relative z-10" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-sm">
                It is a long established <br /> fact that a reader will be
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
