import { Heading, LoadingSpinner } from "@/components/custom";
import UserListingCard from "@/components/custom/UserListingCard";
import { useUserContext } from "@/context/useUserContext";
import {
  useGetCurrentAccount,
  useGetUserSavedPosts,
} from "@/lib/queries/queries";
import { Models } from "appwrite";

const SavedProfiles = () => {
  const { data: currentUser } = useGetCurrentAccount();
  const { user } = useUserContext();
  const { data: savedPosts, isError } = useGetUserSavedPosts(user.id);

  if (!currentUser) return;
  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Saved Missing Persons" />

        {!savedPosts ? (
          <div className="mt-20">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          <p className="text-[16px]">
            You currently do not have any saved missing person profiles.
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedProfiles;
