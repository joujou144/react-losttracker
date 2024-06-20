import {
  Heading,
  LoadingSpinner,
  MissingPersonForm,
} from "@/components/custom";
import { useGetMissingPersonById } from "@/lib/queries/queries";
import { MdOutlineNoteAdd } from "react-icons/md";
import { useParams } from "react-router-dom";

const UpdateMissingPerson = () => {
  const { id } = useParams();

  const { data: profile, isPending } = useGetMissingPersonById(id || "");

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Update Missing Person">
          <MdOutlineNoteAdd size={30} />
        </Heading>

        <MissingPersonForm post={profile} action="Update" />
      </div>
    </div>
  );
};

export default UpdateMissingPerson;
