import { Navigate, Route } from "react-router-dom";
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
  ForgotPassword,
} from "../pages/admin";
import ProjectListPage from "@/pages/admin/ProjectListPage";
import ProjectDetailPage from "@/pages/admin/ProjectDetailPage";

const AdminRoutes = (isAdmin: boolean) => {
  return (
    <>
      <Route path="/admin/login" element={<Login />} /> {/*Abhitha*/}
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />{" "}
      {/*Abhitha*/}
      <Route path="/admin/*" element={<AdminOnlyRoute isAdmin={isAdmin} />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} /> {/*Justin*/}
          <Route path="gallery" element={<Gallery />} /> {/*Nived*/}
          <Route path="projects/*">
            <Route id="projects" path="" element={<Projects />} /> {/*Shabana*/}
            <Route
              id="projects"
              path="create"
              element={<ProjectCreate mode="create" />}
            />{" "}
            {/*Shabana*/}
            <Route
              id="projects"
              path="edit/:id"
              element={<ProjectCreate mode="edit" />}
            />{" "}
            {/*Shabana*/}
          </Route>
          <Route path="projects/:category" element={<ProjectListPage />} />{" "}
          {/*Pranav*/}
          <Route
            path="projects/:projectId"
            element={<ProjectDetailPage />}
          />{" "}
          {/*Pranav*/}
          <Route path="reports" element={<Reports />} /> {/*Justin*/}
          <Route path="services" element={<Services />} /> {/*Nived*/}
          <Route path="profile/edit" element={<ProfileEditpage />} />{" "}
          {/*Arathi*/}
          <Route
            path="profile/reset-password"
            element={<ResetPassword />}
          />{" "}
          {/*Shabana*/}
          <Route path="profile" element={<Profile />} /> {/*Arathi*/}
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Route>
      </Route>
    </>
  );
};

export default AdminRoutes;
