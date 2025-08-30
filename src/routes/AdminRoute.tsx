import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminOnlyRoute from "../components/route-protection/AdminOnlyRoute";
import {
  Login,
  Dashboard,
  Gallery,
  Projects,
  Reports,
  Services,
  ProfileEditpage,
  ResetPassword,
  Profile,
  ProjectCreate,

} from "../pages/admin";
import ProjectListPage from "@/pages/admin/ProjectListPage";
import ProjectDetailPage from "@/pages/admin/ProjectDetailPage";

const AdminRoutes = () => (
  <>
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin/*" element={<AdminOnlyRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gallery" element={<Gallery />} />

       
        <Route path="projects/*">
          <Route id="projects" path="" element={<Projects />} />
          <Route id="projects" path="create" element={<ProjectCreate />} />
        </Route>
        <Route path="projects/:category" element={<ProjectListPage />} />
       <Route path="projects/view/:projectId" element={<ProjectDetailPage />} />
        <Route path="reports" element={<Reports />} />
        <Route path="services" element={<Services />} />
        <Route path="profile/edit" element={<ProfileEditpage />} />
        <Route path="profile/reset-password" element={<ResetPassword />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  </>
);

export default AdminRoutes;
