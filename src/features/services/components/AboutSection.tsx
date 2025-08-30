
import structureImage from "../../../assets/structure.jpg"; // <-- Replace with your actual image

const AboutSection = () => {
  return (
    <section className="py-16 px-4 text-center bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">What We Build, We Build Right</h2>
        <p className="text-gray-700 mb-10">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...
        </p>
        <img
          src={structureImage}
          alt="Steel Structure"
          className="mx-auto rounded-md shadow-md"
        />
      </div>
    </section>
  );
};

export default AboutSection;
