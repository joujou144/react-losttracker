import { Heading } from "@/components/custom";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/useUserContext";
import { useGetUserSavedPosts } from "@/lib/queries/queries";
import { useState } from "react";
import { LuListFilter, LuSearch } from "react-icons/lu";

const MissingDatabase = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Search All Missing Persons" />
        <div className="flex items-center gap-1 px-4 w-full rounded-lg bg-gray-70">
          <LuSearch size={20} />
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search database"
            className="bg-gray-70 border-none placeholder:text-gray-30 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 !important"
          />
        </div>

        <div className="self-start flex-center gap-3 border-[1px] border-gray-50 rounded-xl px-4 py-2 cursor-pointer">
          <p>All</p>
          <LuListFilter />
        </div>

        <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>
      </div>
    </div>
  );
};

export default MissingDatabase;
