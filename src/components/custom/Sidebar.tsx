import { MdLogout } from "react-icons/md";
import {
  Link,
  useNavigate,
  NavLink,
  useLocation,
  matchPath,
} from "react-router-dom";
import { usePostSignOut } from "@/lib/queries/queries";
import { useEffect } from "react";
import { useUserContext } from "@/context/useUserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAcronym } from "@/lib/helpers/user";
import { startCase } from "lodash";
import { sidebarLinks } from "@/constants";
import { Button } from "../ui/button";

const Sidebar = () => {
  const { mutate: signOut, isSuccess } = usePostSignOut();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  const isActive = (route: string) => {
    if (matchPath({ path: route, end: route === "/" }, pathname)) {
      return true;
    }
    return false;
  };

  return (
    <nav className="sidebar">
      <div className="flex flex-col gap-10">
        <Link to="/">
          <img
            src="/assets/Logo-light.svg"
            alt="logo"
            width={145}
            height="auto"
          />
        </Link>
        <Link
          to={`/update-profile/${user.id}`}
          className="flex gap-3 items-center"
        >
          <Avatar>
            <AvatarImage />
            <AvatarFallback className="text-surface-mixed-100 bg-primary-600 font-medium">
              {getAcronym(user.name)}
            </AvatarFallback>
          </Avatar>

          {startCase(user.name)}
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map(({ icon: Icon, route, label }) => {
            const activeLink = isActive(route);
            return (
              <li
                key={route}
                className={`${
                  activeLink && "button-light-background"
                } sidebar-link`}
              >
                <NavLink to={route} className="flex gap-5 items-center p-3">
                  <Icon size={20} />
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        onClick={() => signOut()}
        className="flex gap-5 items-center justify-start px-3 py-5 sidebar-link "
      >
        <MdLogout size={18} />
        <p>Logout</p>
      </Button>
    </nav>
  );
};

export default Sidebar;
