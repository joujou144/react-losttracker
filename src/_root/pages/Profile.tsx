import { Heading } from "@/components/custom";
import { useUserContext } from "@/context/useUserContext";
import { startCase } from "lodash";
import { LuUserCircle2 } from "react-icons/lu";

const Profile = () => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="My Profile">
          <LuUserCircle2 size={30} />
        </Heading>

        <div className="bg-primary-200 px-5 py-4 rounded-lg text-surface-mixed-100 w-full items-start">
          <Heading title={`Hello, ${startCase(user.name)}`} />
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
