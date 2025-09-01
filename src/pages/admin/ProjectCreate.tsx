
import AddProject from "../../features/admin-projects/components/AddProject";

interface AddProjectProps {
  mode: "create" | "edit";
}

const ProjectCreate: React.FC<AddProjectProps> = ({ mode }) => {
  return (
    <div className="flex flex-col gap-[25px] w-full pt-[16px] pb-[120px]
                    sm:pl-[24px] sm:pr-[40px] sm:pb-[140px] 
                    md:pl-[25px] md:pr-[50px] md:pb-[310px]
                    lg:pl-[25px] lg:pr-[60px] lg:pb-[310px] ">
      <AddProject mode={mode} />
    </div>
  );
}

export default ProjectCreate;
