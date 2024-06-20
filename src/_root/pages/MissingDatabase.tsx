import {
  Heading,
  LoadingSpinner,
  MissingProfileCard,
} from "@/components/custom";
import { Input } from "@/components/ui/input";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
// import useDebounce from "@/hooks/useDebounce";
import { useGetPosts } from "@/lib/queries/queries";
// import { Models } from "appwrite";
import { useState } from "react";
import { LuListFilter, LuSearch } from "react-icons/lu";

const MissingDatabase = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    data: { pages: posts = [] } = {},
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetPosts();

  const loadMoreRef = useInfiniteScroll(fetchNextPage);
  // const debouncedValue = useDebounce(searchValue, 500);
  // const { data: searchPost } = useSearchProfile(debouncedValue);
  const showSearchResults = searchValue !== "";
  const showProfiles =
    !showSearchResults && posts.every((item) => item.documents.length === 0);

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

        {!isLoading && !posts.length && (
          <p className="text-center">
            Please cross-check your inputs and try again.
          </p>
        )}
        {isLoading ? (
          <div className="mt-20">
            <LoadingSpinner />
          </div>
        ) : (
          <ul className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) =>
              post.documents.map((profile) => (
                <li key={profile.$id} className="w-full">
                  <MissingProfileCard post={profile} />
                </li>
              ))
            )}
          </ul>
        )}

        {isError && (
          <div ref={loadMoreRef}>
            {isFetchingNextPage && <LoadingSpinner />}
            {!isFetchingNextPage && !hasNextPage && (
              <p className="text-center">There is no more data to load</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MissingDatabase;
