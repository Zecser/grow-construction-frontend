import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/common/SideBar";
import { Card } from "../components/ui/card";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-primary flex">
      <AdminSidebar />
      <Card className="flex-1 py-0 bg-background overflow-y-auto my-6 rounded-xl mr-2 md:mr-3">
        <Outlet />
      </Card>
    </div>
  );
};

export default AdminLayout;
