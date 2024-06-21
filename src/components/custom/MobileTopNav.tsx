import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { usePostSignOut } from "@/lib/queries/queries";
import { useEffect } from "react";
import { useUserContext } from "@/context/useUserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAcronym } from "@/lib/helpers/user";

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
          <img
            src="/assets/Logo-light-blur.svg"
            alt="logo"
            width={130}
            height="auto"
          />
        </Link>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="hover:text-amaranth
            "
            onClick={() => signOut()}
          >
            <MdLogout size={22} className="px-0" />
          </Button>
          <Link to={`/profile/${user.id}`} className="">
            <Avatar>
              <AvatarImage />
              <AvatarFallback className="text-surface-mixed-100 bg-primary-600  font-medium">
                {getAcronym(user.name)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MobileTopNav;
