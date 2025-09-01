import type { RootState } from "@/store";
import { UserCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { admin } = useSelector((state: RootState) => state.admin);
  return (
    <section>
      <div className="flex items-center justify-end gap-3 md:gap-[30px]">
        <div className="flex items-center gap-2">
          <p className="hidden md:block">{admin?.first_name || "Admin"}</p>{" "}
          <Link to={"/admin/profile"}>
            <UserCircle size={30} className="text-primary" />
          </Link>
        </div>
      </div>
      <p className="font-medium mt-3 md:text-lg">
        {" "}
        Welcome Back {admin?.first_name || "Admin"} {admin?.last_name || ""}
      </p>
    </section>
  );
};

export default Header;
