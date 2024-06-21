import {
  Heading,
  LoadingSpinner,
  MissingProfileCard,
} from "@/components/custom";
import InfoBoard from "@/components/custom/InfoBoard";
import UserListingCard from "@/components/custom/UserListingCard";
import { useUserContext } from "@/context/useUserContext";
import { getRandomNumber } from "@/lib/helpers/getRandomNumber";
import { useDateDisplay } from "@/lib/helpers/useDateDisplay";
import { getFirstName } from "@/lib/helpers/user";
import {
  useGetRecentMissingProfiles,
  useGetUserListings,
} from "@/lib/queries/queries";
import { ExistingUserProps } from "@/types";
import { Models } from "appwrite";
import { startCase } from "lodash";
import { FiEdit2 } from "react-icons/fi";
import { MdUpdate } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUserContext();
  const currentDate = useDateDisplay();
  const {
    data: missingPersons,
    isPending,
    isError,
  } = useGetRecentMissingProfiles();

  const {
    data: userListings,
    isPending: loadingListings,
    isError: listingsError,
  } = useGetUserListings(user.id);

  if (!missingPersons && !userListings) return;

  return (
    <div className="flex flex-1">
      <div className="main-container">
        <ProfileBanner user={user} />

        <Heading title="My Listings" className="mt-4">
          <RiFileListLine size={30} />
        </Heading>

        {!userListings || loadingListings ? (
          <div className="mt-10">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {userListings?.documents.map((listing: Models.Document) => (
              <li key={listing.$id} className="w-full">
                <UserListingCard
                  listing={listing}
                  userId={user.id}
                  variant="edit"
                />
              </li>
            ))}
          </ul>
        )}
        {listingsError && <p>Unable to load your listings.</p>}
        {!userListings?.documents.length && (
          <p className="text-[16px]">You currently do not have any listings.</p>
        )}

        {/* Latest Missing Cases */}
        <div className="text-left w-full mt-4">
          <Heading title="Latest Missing Persons Cases" className="mb-2" />
          <p className="text-xs text-gray-30">Updated {currentDate}</p>
        </div>

        {!missingPersons && isPending ? (
          <div className="mt-20">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {missingPersons?.documents.map((post: Models.Document) => (
              <li key={post.$id} className="w-full">
                <MissingProfileCard post={post} />
              </li>
            ))}
          </ul>
        )}
        {isError && <p>Unable to load data.</p>}

        <MissingPeopleRecord />
      </div>
    </div>
  );
};

type ProfileBannerProps = {
  user: ExistingUserProps;
};

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  if (!user) return;
  return (
    <div className="bg-slate-200 rounded-lg p-5 text-dark-200 flex flex-col lg:flex-row justify-between gap-3">
      <div className="flex-1 lg:w-2/3">
        <h2 className="h2-bold text-left w-full mb-2">{`Welcome, ${getFirstName(
          startCase(user.name)
        )}`}</h2>
        <p className=" md:text-[18px]">
          Your dedication to helping families reunite is invaluable. By sharing
          your knowledge and keeping an eye out, you're making a real
          difference. Together, we can bring hope and find those who are
          missing.
        </p>
      </div>
      <div className="bg-primary-200 text-primary-700 px-5 py-4 rounded-lg lg:w-1/3 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-[16px] lg:text-[18px]">My Profile</h3>
          <Link to={`/update-profile/${user.id}`} className="cursor-pointer">
            <FiEdit2
              size={18}
              className="hover:text-gray-70 transition duration-200"
            />
          </Link>
        </div>

        {/* User details */}
        <div>
          <p>{startCase(user.name)}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

const MissingPeopleRecord = () => {
  const stats = [
    { label: "Approximate Total Records", number: getRandomNumber(1000, 5000) },
    {
      label: "Approximate Canceled or Cleared",
      number: getRandomNumber(1000, 5000),
    },
    { label: "Approximate Located", number: getRandomNumber(1000, 5000) },
    { label: "Approximate Active Cases", number: getRandomNumber(1000, 5000) },
  ];

  return (
    <div className="mt-4">
      <Heading title="Missing People Statistics" className="mb-6">
        <MdUpdate size={30} />
      </Heading>

      {/* Card with NCIC statistics */}
      <InfoBoard title={"Missing People by the Numbers"}>
        <p className="md:text-[16px]">
          By the end of December 2022, the NCA (National Crime Agency) held
          57,125 active missing person cases. Of these, 10,512 (31 percent)
          involved individuals under 18, and 30,504 (41 percent) were for those
          under 21.
        </p>
        <p className="mt-4 md:text-[16px]">
          In 2022, 346,568 missing person cases were registered in the NCA.
          During the same year, 333,088 records were removed. The removals
          occurred because the individuals were found by law enforcement,
          returned home, or the records were deemed invalid and deleted by the
          registering agency.
        </p>
      </InfoBoard>

      {/* Statistics cards */}
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-primary-700 mt-6">
        {stats.map(({ label, number }) => (
          <li
            key={label}
            className="bg-dark-300 px-5 py-4 rounded-lg shadow-md h-[120px] flex flex-col justify-between"
          >
            <h4 className="text-sm md:text-[16px] overflow-hidden text-ellipsis mb-2">
              {label}
            </h4>
            <p className="text-[22px] font-bold">{number}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs md:text-sm ">
        LostTracker only accepts cases that have been verified with law
        enforcement and entered into the NCA system.
      </p>
    </div>
  );
};

export default Dashboard;
