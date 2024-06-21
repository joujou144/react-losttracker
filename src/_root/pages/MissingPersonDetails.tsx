import { Heading, Label, LoadingSpinner } from "@/components/custom";
import InfoBoard from "@/components/custom/InfoBoard";
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

        <div className="rounded-lg bg-primary-700 text-dark-200">
          <div className=" lg:flex flex-row">
            <div className="flex-shrink-0 w-full lg:w-1/2 xl:w-[40%]">
              <img
                src={post?.imageUrl || <PiImageBroken />}
                className="w-full h-auto lg:h-full rounded-t-lg lg:rounded-tl-lg lg:rounded-t-none object-cover object-center lg:object-top  transition-all"
                alt={`${post?.name}'s photo`}
              />
            </div>

            <div className="px-5 py-4 lg:pb-0 flex flex-col gap-4 justify-between lg:w-1/2 xl:w-[60%]">
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

              {/* Case details */}
              <Label
                label="case status"
                labelClass="pt-4 border-t-4 border-primary-200"
              >
                <CaseStatus activeCase={post.activeCase} />
              </Label>
              <Label label="case entered">
                {formatDateObj(post?.$createdAt)}
              </Label>
              <Label label="missing from">{post?.location}</Label>

              <Label label="category">Missing adults</Label>
              <Label label="source of record">Family/Friends</Label>
              <Label label="reported missing">{post?.date}</Label>

              {/* Physical details */}
              <div className="border-primary-200 border-y-4 flex flex-col gap-4 flex-1 lg:flex-row justify-between py-4">
                <Label label="Sex">Female</Label>
                <Label label="Ethinicity">Caucasian</Label>
                <Label label="Age Range">30-39</Label>
              </div>
            </div>
          </div>

          {/*  Information Details */}
          <Label label="details of disappearance" className="p-5">
            {post?.description}
          </Label>
        </div>
        {isError && <p className="text-center">Unable to load data.</p>}

        <InfoBoard title={upperCase("who to contact")}>
          <p className="text-pretty lg:text-[15px]">
            If you have any information on the whereabouts of{" "}
            <span className="font-normal text-blue-300">{post?.name}</span>, you
            are encouraged to contact the Local Police Department at
            123-456-789, ask for Detective Jane Doe. Please include case number{" "}
            <span className="font-normal text-blue-300">555 555</span> as you
            will need it.
          </p>
        </InfoBoard>
      </div>
    </div>
  );
};

export default MissingPersonDetails;
