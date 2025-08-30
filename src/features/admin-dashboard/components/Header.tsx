import { UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section>
      <div className="flex items-center justify-end gap-3 md:gap-[30px]">
        <div className="flex items-center gap-2">
          <p className="hidden md:block">David</p>{" "}
          <Link to={"/admin/profile"}>
            <UserCircle size={30} className="text-primary" />
          </Link>
        </div>
      </div>
      <p className="font-medium mt-3 md:text-lg"> Welcome Back David</p>
    </section>
  );
};

export default Header;
