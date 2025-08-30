import HeroSection from "../../components/sections/HeroSection";
import { HomePage } from "../../features/home";


const Home = () => {
  return (
    <div >
      <HeroSection heading="The Future Of Construction" image='/images/image.png' subheading="Building a sustainable future through innovative, efficient, and eco friendly construction solutions that inspire progress." />
      <HomePage />
    </div>
  );
};

export default Home;
