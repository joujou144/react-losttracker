import { Heading, LoadingSpinner } from "@/components/custom";
import UserListingCard from "@/components/custom/UserListingCard";
import { useUserContext } from "@/context/useUserContext";
import {
  useGetCurrentAccount,
  useGetUserSavedPosts,
} from "@/lib/queries/queries";
import { Models } from "appwrite";
import { MdOutlineBookmarks } from "react-icons/md";

const SavedProfiles = () => {
  const { data: currentUser } = useGetCurrentAccount();
  const { user } = useUserContext();
  const { data: savedPosts, isError } = useGetUserSavedPosts(user.id);

  if (!currentUser) return;
  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Saved Missing Persons">
          <MdOutlineBookmarks size={30} />
        </Heading>

        <div className="self-start w-full 2xl:w-[60%]">
          {!savedPosts ? (
            <div className="mt-20 self-center">
              <LoadingSpinner />
            </div>
          ) : (
            <ul className="grid gap-4  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {savedPosts.documents.map((listing: Models.Document) => (
                <li key={listing.$id} className="w-full">
                  <UserListingCard
                    variant="saved"
                    listing={listing.missingPerson}
                    userId={user.id}
                  />
                </li>
              ))}
            </ul>
          )}
          {isError && <p>Unable to load your saved missing profiles.</p>}
          {!savedPosts?.documents.length && (
            <p className="text-[16px] mt-4 self-center">
              You currently do not have any saved missing person profiles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedProfiles;
