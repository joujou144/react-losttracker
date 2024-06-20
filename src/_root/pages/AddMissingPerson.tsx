import { Heading, MissingPersonForm } from "@/components/custom";
import { MdOutlineNoteAdd } from "react-icons/md";

const AddMissingPerson = () => {
  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Add Missing Person">
          <MdOutlineNoteAdd size={30} />
        </Heading>

        {/* <h3 className="px-5 py-3 light-box-background rounded-lg">
          When a loved one goes missing, it can be distressing and overwhelming.
          To help you navigate the unknown, follow these steps to report a
          missing person so we can begin providing services.
        </h3> */}

        <p className="px-5 py-3 rounded-lg bg-gray-10 text-surface-mixed-100 font-normal self-start w-full">
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
