import { Link, useLocation } from "react-router-dom";
import { APP_NAME, LOGO } from "../../utils/constants";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "./constants";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div className="sticky flex top-0 left-0 right-0 items-center justify-between shadow py-[10px] md:py-[15px] px-[20px] bg-background md:px-[50px] lg:px-[70px] z-30">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="w-6 cursor-pointer h-8" asChild>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[250px] sm:w-[300px] flex flex-col justify-between px-[20px]"
          >
            <nav className="flex flex-col gap-4 mt-10">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`text-lg transition-colors duration-200 ${
                      isActive
                        ? "text-primary border-b border-primary pb-1"
                        : "text-black hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="text-lg md:text-xl flex items-center gap-2 text-primary font-medium">
        <img src={LOGO} className="h-7 w-7" />
        {APP_NAME}
      </div>

      <nav className="hidden md:flex gap-8">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.path === "/"
              ? link.path === pathname
              : pathname.includes(link.path);
          return (
            <Link
              key={link.label}
              to={link.path}
              className={`text-[14px] transition-colors duration-200 ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "text-black hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="w-6 h-6 md:hidden" />
    </div>
  );
};

export default Header;
