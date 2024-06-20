import {
  Heading,
  LoadingSpinner,
  MissingProfileCard,
} from "@/components/custom";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
// import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useGetPosts, useSearchProfile } from "@/lib/queries/queries";
import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useInView } from "react-intersection-observer";

const MissingDatabase = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    data: { pages: posts = [] } = {},
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError: isPostsError,
    isLoading,
  } = useGetPosts();

  const { ref, inView } = useInView();
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchPost } = useSearchProfile(debouncedValue);

  const filteredPosts = debouncedValue
    ? searchPost?.documents || []
    : posts.flatMap((page) => page.documents);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(""); // Clear search value on Enter key press
    }
  };

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView]);
  if (isPostsError) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center align-middle max-w-screen mx-auto">
        <p>Error fetching data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="main-container">
        <Heading title="Search All Missing Persons" />

        <h3 className="px-5 py-4 bg-surface-mixed-300 rounded-lg">
          When a loved one goes missing, it can be distressing and overwhelming.
          We are dedicated to helping you find missing people in your
          area.Whether you are a concerned citizen, a friend, or a family member
          looking for a loved one, our website serves as a valuable resource in
          raising awareness and facilitating the search for missing individuals.
        </h3>
        <div className="flex items-center gap-1 px-4 w-full rounded-lg bg-dark-200 ">
          <LuSearch size={20} />
          <Input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search database"
            className="bg-dark-200 border-none placeholder:text-gray-30 focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0 !important"
          />
        </div>

        {isLoading && (
          <div className="mt-20 flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && (
          <ul className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((profile) => (
                <li key={profile.$id} className="w-full">
                  <MissingProfileCard post={profile} />
                </li>
              ))
            ) : (
              <p className="text-center">
                {debouncedValue ? "No results found" : "No data available"}
              </p>
            )}
          </ul>
        )}

        {isFetchingNextPage && hasNextPage && !searchValue ? (
          <div className="mt-4 flex justify-center" ref={ref}>
            <LoadingSpinner />
          </div>
        ) : (
          <p className="text-center">There is no more data to load</p>
        )}
      </div>
    </div>
  );
};

export default MissingDatabase;
