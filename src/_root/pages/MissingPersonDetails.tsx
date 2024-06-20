import { Heading, Label, LoadingSpinner } from "@/components/custom";
import { useToast } from "@/components/ui/use-toast";
import { CaseStatus } from "@/lib/helpers/caseStatus";
import { formatDateObj } from "@/lib/helpers/formatDate";
import {
  useDeleteSavedProfile,
  useGetCurrentAccount,
  useGetMissingPersonById,
  useSaveProfile,
} from "@/lib/queries/queries";
import { Models } from "appwrite";

import { upperCase } from "lodash";
import { useEffect, useState } from "react";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { PiImageBroken, PiNotePencil } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";

const MissingPersonDetails = () => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();

  const { data: post, isPending, isError } = useGetMissingPersonById(id || "");

  const { data: currentUser } = useGetCurrentAccount();

  const { mutate: saveProfile } = useSaveProfile();
  const { mutate: deleteSavedProfile } = useDeleteSavedProfile();

  const savedProfileRecord = currentUser?.save.find(
    (record: Models.Document) => record.missingPerson.$id === post?.$id
  );

  useEffect(() => {
    setSaved(!!savedProfileRecord);
  }, [currentUser, post]);

  const handleSaveProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!post || !post.$id) return;

    if (savedProfileRecord) {
      setSaved(false);
      toast({ title: "Removed from collection!" });
      return deleteSavedProfile(savedProfileRecord.$id);
    } else {
      saveProfile({ userId: post.creator.$id, postId: post.$id });
      setSaved(true);
      toast({ title: "Saved to collection!" });
    }
  };

  if (!post) return;

  return (
    <div className="flex flex-1">
      <div className="main-container">
        {isPending && <LoadingSpinner />}
        <Heading title={post?.name} />
        <div className="flex justify-between items-center w-full">
          <p className="w-full text-left">
            Updated {formatDateObj(post?.$updatedAt)}
          </p>
          <Link to={`/missing-people/update-missing-person/${id}`}>
            <PiNotePencil
              size={30}
              className="hover:text-gray-30 transition duration-200 self-end"
            />
          </Link>
        </div>

        <div className="bg-surface-mixed-200 rounded-lg text-primary-600 lg:flex flex-row">
          <div className="flex-shrink-0 w-full lg:w-1/2 xl:w-[40%]">
            <img
              src={post?.imageUrl || <PiImageBroken />}
              className="w-full h-auto lg:h-full rounded-t-lg lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-t-none object-cover object-center lg:object-top  transition-all"
              alt={`${post?.name}'s photo`}
            />
          </div>

          <div className="px-5 py-4 flex flex-col gap-4 justify-between">
            <div className="flex justify-between items-center">
              <Heading title={post?.name} />

              <span onClick={handleSaveProfile} className="cursor-pointer">
                {saved ? (
                  <MdBookmark size={25} />
                ) : (
                  <MdBookmarkBorder size={25} />
                )}
              </span>
            </div>

            <Label label="case status">
              <CaseStatus activeCase={post.activeCase} />
            </Label>

            <Label label="missing from">{post?.location}</Label>

            <Label label="reported missing">{post?.date}</Label>

            <Label label="case entered">
              {formatDateObj(post?.$createdAt)}
            </Label>

            <Label label="details of disappearance">{post?.description}</Label>
          </div>
        </div>
        {isError && <p>Unable to load data.</p>}

        <div className="bg-gray-30 rounded-lg p-5">
          <Heading title={upperCase("Who To Contact")} className="mb-4" />
          <p className="text-pretty lg:text-[15px]">
            {`If you have any information on the whereabouts of ${post?.name}, you are encouraged to contact the Local Police Department at 123-456-789, ask for Detective Jane Doe.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissingPersonDetails;
