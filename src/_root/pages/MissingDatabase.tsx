import {
  Heading,
  LoadingSpinner,
  MissingProfileCard,
} from "@/components/custom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchProfile } from "@/lib/queries/queries";
import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useInView } from "react-intersection-observer";
import { Models } from "appwrite";
import { CombinedDataProps, CombinedProfile } from "@/types";
import { markers } from "@/lib/markers";

const MissingDatabase = () => {
  const [searchValue, setSearchValue] = useState("");
  const [combinedData, setCombinedData] = useState<CombinedProfile[]>([]);

  // TODO: Consider doing a normal search instead of Infinite query due to typescript error on getNextPageParams
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
    const listProfiles: Models.Document[] = posts.flatMap(
      (page) => page.documents
    );

    const combined = listProfiles.map((profile, index) => ({
      ...profile,
      name: profile.name,
      date: profile.date,
      imageUrl: profile.imageUrl,
      geocode: markers[index].geocode,
    }));
    setCombinedData(combined);
  }, []);

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
        <div className="2xl:w-[60%] self-start flex flex-1 flex-col gap-6">
          {/* Leaflet Map */}
          <LocalMissingMap combinedData={combinedData} />

          <Heading title="Search All Missing Persons" />

          {/* Search database */}
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
            <p className="text-center mt-4">There is no more data to load</p>
          )}
        </div>
      </div>
    </div>
  );
};

const LocalMissingMap = ({ combinedData }: CombinedDataProps) => {
  if (!combinedData)
    return (
      <div className="mt-6 flex flex-col items-center">
        <LoadingSpinner />
      </div>
    );
  return (
    <>
      <Heading title="Local Missing Map" />
      <h3 className="px-5 py-4 bg-surface-mixed-600 rounded-lg text-primary-700">
        When a loved one goes missing, it can be distressing and overwhelming.
        We are dedicated to helping you find missing people in your area. By
        leveraging advanced technology and utilizing the power of geolocation,
        we display information about missing individuals within a fifty-mile
        radius of your current location. By focusing on a specific radius around
        your location, we aim to provide you with localized results that are
        most relevant to your community.
        <br />
        <br />
        Whether you are a concerned citizen, a friend, or a family member
        looking for a loved one, our website serves as a valuable resource in
        raising awareness and facilitating the search for missing individuals.
      </h3>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={9}
        scrollWheelZoom={false}
        className="h-[450px] rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {combinedData &&
          combinedData.map(({ geocode, name, imageUrl, date }) => (
            <Marker position={geocode} key={name}>
              <Popup>
                <div className=" w-[200px] flex gap-2 items center ">
                  <img src={imageUrl} className="w-[80px] rounded-full" />
                  <div className="text-xxs">
                    <p className="font-medium">{name}</p>
                    <p>
                      Missing since <span className="font-medium">{date}</span>
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </>
  );
};

export default MissingDatabase;
