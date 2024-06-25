import { Heading, LoadingSpinner } from "@/components/custom";
import { useGetUserById } from "@/lib/queries/queries";
import { MdOutlineNoteAdd } from "react-icons/md";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const { id } = useParams();

  const { data: userProfile, isPending } = useGetUserById(id || "");

  console.log("userProfile", userProfile);
  if (isPending) return <LoadingSpinner />;
  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Update My Profile">
          <MdOutlineNoteAdd size={30} />
        </Heading>
      </div>
    </div>
  );
};

export default UpdateProfile;
