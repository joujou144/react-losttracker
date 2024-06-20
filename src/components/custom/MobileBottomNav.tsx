import { sidebarLinks } from "@/constants";
import { Link, matchPath, useLocation } from "react-router-dom";

const MobileBottomNav = () => {
  const { pathname } = useLocation();
  const isActive = (route: string) => {
    if (matchPath({ path: route, end: route === "/" }, pathname)) {
      return true;
    }
    return false;
  };
  return (
    <section className="mobile-bottom-nav text-xs gap-1">
      {sidebarLinks.map(({ icon: Icon, route, label }) => {
        const activeLink = isActive(route);
        return (
          <Link
            key={route}
            className={`${
              activeLink && "button-light-background"
            } flex flex-col gap-1 items-center p-2 w-[90px] sidebar-link`}
            to={route}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </section>
  );
};

export default MobileBottomNav;
