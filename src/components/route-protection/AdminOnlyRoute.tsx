import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isAdmin: boolean;
};

const AdminOnlyRoute = ({ isAdmin }: Props) => {
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminOnlyRoute;
