import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { usePostSignOut } from "@/lib/queries/queries";
import { useEffect } from "react";
import { useUserContext } from "@/context/useUserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAcronym } from "@/lib/helpers/user";
import logo from "/assets/Logo-light-blur.svg";
import LoadingSpinner from "./LoadingSpinner";

const MobileTopNav = () => {
  const { mutate: signOut, isSuccess } = usePostSignOut();
  const { user } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="mobile-nav">
      <div className="flex flex-between items-center py-4 px-5">
        <Link to="/">
          <img src={logo} alt="losttracker-logo" width={130} height="auto" />
        </Link>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="hover:text-primary-200
            "
            onClick={() => signOut()}
          >
            <MdLogout size={22} className="px-0" />
          </Button>

          {!user ? (
            <LoadingSpinner />
          ) : (
            <Link to={`/update-profile/${user.id}`} className="">
              <Avatar>
                <AvatarImage />
                <AvatarFallback className="text-surface-mixed-100 bg-primary-600  font-medium">
                  {getAcronym(user.name)}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default MobileTopNav;
