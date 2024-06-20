import { Heading, MissingPersonForm } from "@/components/custom";
import { MdOutlineNoteAdd } from "react-icons/md";

const AddMissingPerson = () => {
  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Add Missing Person">
          <MdOutlineNoteAdd size={30} />
        </Heading>

        <p className="px-5 py-4 bg-surface-mixed-300 rounded-lg font-normal self-start w-full">
          Important: Please profile your missing person in our database only
          when you have already filed a verifiable police report with local
          authorities.
        </p>
        <h4 className="text-[15px] self-start">
          Enter profile of verifiable missing adult case
        </h4>

        <MissingPersonForm action="Create" />
      </div>
    </div>
  );
};

export default AddMissingPerson;
