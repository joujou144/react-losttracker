import {
  MdOutlineAddBox,
  MdOutlineBookmarks,
  MdOutlineDashboard,
} from "react-icons/md";
import { TbDatabase } from "react-icons/tb";

export const sidebarLinks = [
  {
    icon: MdOutlineDashboard,
    route: "/",
    label: "Dashboard",
  },
  {
    icon: TbDatabase,
    route: "/missing-people",
    label: "Missing",
  },
  {
    icon: MdOutlineBookmarks,
    route: "/saved-missing-profiles",
    label: "Saved",
  },
  {
    icon: MdOutlineAddBox,
    route: "/add-missing-person",
    label: "Add",
  },
];
