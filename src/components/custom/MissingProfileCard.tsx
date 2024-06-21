import { Models } from "appwrite";
import { PiImageBroken } from "react-icons/pi";
import { Link } from "react-router-dom";

type MissingProfileProps = {
  post: Models.Document;
};

type BadgeProps = {
  label: string;
  variant: keyof typeof VARIANT_COLOUR;
};

const badges: BadgeProps[] = [
  { label: "Urgent", variant: "red" },
  { label: "Active", variant: "teal" },
];

const VARIANT_COLOUR = {
  teal: "bg-emerald-500",
  red: "bg-red-600",
};

const MissingProfileCard = ({ post }: MissingProfileProps) => {
  return (
    <div className="bg-slate-200 rounded-lg text-dark-200 h-[420px]">
      <div className="flex flex-col h-full">
        <Link to={`/missing-people/${post.$id}`}>
          <img
            src={post.imageUrl || <PiImageBroken />}
            className="w-full h-[270px] rounded-t-lg object-cover object-center lg:object-top  transition-all cursor-pointer"
            alt={`${post.name}'s photo`}
          />
        </Link>

        <div className="px-5 py-3 flex flex-col justify-between h-1/3 relative min-w-[200px]">
          <ul className="flex gap-3 absolute -top-4">
            {badges.map(({ label, variant }) => (
              <li
                key={label}
                className={`${VARIANT_COLOUR[variant]} text-primary-700 px-4 py-1 rounded-2xl text-xs md:text-sm`}
              >
                {label}
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-2">
            <h4 className="text-[16px] md:text-[18px] xl:text-[20px] font-medium">
              {post.name}
            </h4>
          </div>

          <p className="text-xs md:text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            Reported missing {post.date}
          </p>
          <p className="text-dark-100 font-normal text-xs md:text-sm overflow-hidden text-ellipsis whitespace-nowrap">
            {post.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissingProfileCard;
