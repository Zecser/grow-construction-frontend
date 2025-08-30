import Header from "../../features/admin-services/components/Header";
import ServicePage from "../../features/admin-services/components/ServicePage";
const Service = () => {
  return (
    <div className="w-full pl-[21px] pr-[22px] pb-[62px] pt-[15px]
                    sm:pl-[0px] sm:pr-[0px] sm:pb-[0px] 
                    md:pl-[21px] md:pr-[60px] md:pb-[30px]
                    lg:pl-[21px] lg:pr-[60px] lg:pb-[30px] ">
      <Header />
      <ServicePage />
    </div>
  );
}

export default Service;
