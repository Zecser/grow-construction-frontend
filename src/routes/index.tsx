import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import AdminRoutes from "./AdminRoute";
import NotFound from "../pages/NotFound";
import { useAdminLoader } from "@/hooks/useAdminLoader";
import GlobalLoader from "@/components/common/GloabalLoader";

const AppRoutes = () => {
  const { admin, showLoader } = useAdminLoader();

  if (showLoader) return <GlobalLoader />;

  return (
    <Routes>
      {PublicRoute()}
      {AdminRoutes(!!admin)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
