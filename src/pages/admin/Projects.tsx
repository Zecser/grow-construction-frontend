import { Header } from "../../features/admin-projects";
import { ProjectPage } from "../../features/admin-projects";

const Project = () => {
  return (
    <div
      className="flex flex-col gap-[25px] w-full pt-[16px] pb-[50px]
                    sm:pl-[20px] sm:pr-[20px] sm:pb-[70px] 
                    md:pl-[20px] md:pr-[50px] md:pb-[70px]
                    lg:pl-[20px] lg:pr-[50px] lg:pb-[70px] xl:pb-[70px] "
    >
      <Header />
      <ProjectPage />
    </div>
  );
};

export default Project;
