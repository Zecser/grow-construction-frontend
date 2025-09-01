import { Link, useLocation } from "react-router-dom";
import { ADMIN_NAV_LINKS } from "./constants";
import { APP_NAME, LOGO } from "../../utils/constants";

const AdminSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="h-screen md:w-48 bg-primary text-white flex flex-col py-6 sticky top-0">
      <div className="mb-10 px-6 hidden md:flex items-center gap-2">
        <img src={LOGO} alt={APP_NAME} className="h-8 w-8 object-cover"/>
        <h1 className="text-sm">{APP_NAME}</h1>
      </div>

      <nav className="flex flex-col gap-4">
        {ADMIN_NAV_LINKS.map(({ label, path, icon: Icon }) => {
          const isActive = pathname.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              className={`flex relative items-center gap-3 px-5 md:px-7 py-2 rounded-md transition-colors ${
                isActive
                  ? "text-white font-semibold"
                  : "text-white/60 hover:bg-white/10"
              }`}
            >
              {isActive && <div className="w-2 rounded-r-md rounded-l bg-white absolute left-0 h-2/3"></div>}
              <Icon className={`w-5 h-5`} />
              <span className="text-sm hidden md:block">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
