import { Card } from "../../components/ui/card";
import {
  ProjectsCard,
  ProjectStatusList,
  DashboardHeader,
} from "../../features/admin-dashboard";

const Dashboard = () => {
  return (
    <div className="w-full p-[20px] space-y-4">
      <DashboardHeader />
      <Card>
        <ProjectsCard />
      </Card>
      <ProjectStatusList />
    </div>
  );
};

export default Dashboard;
