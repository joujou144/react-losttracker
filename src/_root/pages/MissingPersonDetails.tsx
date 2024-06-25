import {
  AdviceBoard,
  Heading,
  InfoBoard,
  Label,
  LoadingSpinner,
} from "@/components/custom";
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
import { PiImageBroken } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";

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

        {!isPending && !isError && (
          <>
            <Heading title={post?.name} />
            <div className="flex justify-between items-center w-full">
              <p className="w-full text-left">
                Updated {formatDateObj(post?.$updatedAt)}
              </p>
              <Link
                to={`/missing-people/update-missing-person/${id}`}
                className={`${
                  currentUser?.$id !== post?.creator.$id && "hidden"
                }`}
              >
                <FiEdit2
                  size={22}
                  className="hover:text-gray-30 transition duration-200 self-end"
                />
              </Link>
            </div>

            <div className="rounded-lg bg-slate-200 text-dark-100">
              <div className="lg:flex flex-row">
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

                    <span
                      onClick={handleSaveProfile}
                      className="cursor-pointer"
                    >
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
                    labelClass="pt-4 border-t-4 border-white"
                  >
                    <CaseStatus activeCase={post.activeCase} />
                  </Label>
                  <Label label="case entered">
                    {formatDateObj(post?.$createdAt)}
                  </Label>
                  <Label label="missing from">{post?.location}</Label>

                  <Label label="category">Missing Adults</Label>
                  <Label label="source of record">Family/Friends</Label>
                  <Label label="reported missing">{post?.date}</Label>

                  {/* Physical details */}
                  <div className="border-white border-y-4 flex flex-col gap-4 flex-1 lg:flex-row justify-between py-4">
                    <Label label="Sex">Female</Label>
                    <Label label="Ethinicity">Caucasian</Label>
                    <Label label="Age Range">30-39</Label>
                  </div>
                </div>
              </div>

              {/*  Information Details */}
              <Label
                label="details of disappearance"
                className="px-5 pb-5 lg:pt-5"
              >
                {post?.description}
              </Label>
            </div>
          </>
        )}

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

        <AdviceBoard title="Be Advised">
          <p>
            If you encounter{" "}
            <span className="font-normal text-blue-300">{post.name}</span>,
            avoid direct interaction. Instead, dial your local emergency number,
            such as 911, or the law enforcement contact number listed in this
            record. They will guide you on the appropriate steps. Additionally,
            mention{" "}
            <span className="font-normal text-blue-300">{post.name}</span>'s{" "}
            name and inform them that their profile is on this website. This
            enables authorities to quickly access the profile for more
            information.
            {/* You can also provide us with a tip by clicking the
            "Tip" link in the top menu of this page. */}
          </p>

          <p className="mt-4">
            *** If the information contained in this missing persons profile is
            inaccurate, needs to be updated, or the person has been located,
            please let our staff know as soon as possible. Thank you. ***
          </p>
        </AdviceBoard>
      </div>
    </div>
  );
};

export default MissingPersonDetails;
