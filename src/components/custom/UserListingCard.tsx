import {
  useDeleteSavedProfile,
  useGetCurrentAccount,
  useSaveProfile,
} from "@/lib/queries/queries";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { PiImageBroken, PiNotePencil } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { CaseStatus } from "@/lib/helpers/caseStatus";

type MissingProfileProps = {
  listing: Models.Document;
  userId: string;
  variant: "saved" | "edit";
};

const UserListingCard = ({ listing, userId, variant }: MissingProfileProps) => {
  const { data: currentUser } = useGetCurrentAccount();
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const { mutate: saveProfile } = useSaveProfile();
  const { mutate: deleteSavedProfile } = useDeleteSavedProfile();
  const savedProfileRecord = currentUser?.save.find(
    (record: Models.Document) => record.missingPerson.$id === listing?.$id
  );

  useEffect(() => {
    setSaved(!!savedProfileRecord);
  }, [currentUser, listing]);

  const handleSaveProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!listing || !listing.$id) return;

    if (savedProfileRecord) {
      setSaved(false);
      toast({ title: "Removed from collection!" });
      return deleteSavedProfile(savedProfileRecord.$id);
    } else {
      saveProfile({ userId: userId, postId: listing.$id });
      setSaved(true);
      toast({ title: "Saved to collection!" });
    }
  };

  return (
    <div className="bg-surface-mixed-200 rounded-lg text-primary-600 h-[420px]">
      <div className="flex flex-col h-full">
        <Link to={`/missing-people/${listing.$id}`}>
          <img
            src={listing.imageUrl || <PiImageBroken />}
            className="w-full h-[270px] rounded-t-lg object-cover object-center lg:object-top  transition-all cursor-pointer"
            alt={`${listing.name}'s photo`}
          />
        </Link>

        <div className="px-5 py-3 flex flex-col justify-between h-1/3 relative min-w-[200px]">
          <div className="flex gap-3 absolute -top-4">
            <CaseStatus activeCase={listing.activeCase} />
          </div>

          <div className="flex justify-between items-center mt-2">
            <h4 className="text-[16px] md:text-[18px] xl:text-[20px] font-medium">
              {listing.name}
            </h4>
            {variant === "saved" && (
              <span onClick={handleSaveProfile} className="cursor-pointer">
                {saved ? (
                  <MdBookmark size={25} />
                ) : (
                  <MdBookmarkBorder size={25} />
                )}
              </span>
            )}

            {variant === "edit" && (
              <Link
                to={`/missing-people/update-missing-person/${listing.$id}`}
                className={`${currentUser?.$id !== userId && "hidden"}`}
              >
                <PiNotePencil
                  size={25}
                  className="hover:text-gray-70 transition duration-200"
                />
              </Link>
            )}
          </div>

          <p className="text-xs md:text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            Reported missing {listing.date}
          </p>
          <p className="text-primary-700 text-xs md:text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {listing.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserListingCard;
