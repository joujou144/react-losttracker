import {
  NewPostProps,
  NewUserProps,
  UpdatePostProps,
  UpdateUserProps,
} from "@/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createMissingPersonProfile,
  createUserAccount,
  deleteSavedProfile,
  getAllPosts,
  getCurrentAccount,
  getCurrentUser,
  getMissingProfileById,
  getRecentMissingProfiles,
  getUserListings,
  getUserProfileById,
  getUserSavedPosts,
  saveProfile,
  searchProfile,
  signInAccount,
  signOutAccount,
  updateMissingPerson,
  updateUserProfile,
} from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

// ------ AUTH QUERIES ------ //

// SIGN UP //
export const usePostSignUp = () => {
  return useMutation({
    mutationFn: (user: NewUserProps) => createUserAccount(user),
  });
};

// LOGIN //
export const usePostSignIn = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

// SIGN OUT //
export const usePostSignOut = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// GET CURRENT USER //
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

// GET CURRENT ACCOUNT //
export const useGetCurrentAccount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentAccount,
  });
};

// ------ POST QUERIES ------ //

// POST A MISSING PERSON //
export const usePostMissingPerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: NewPostProps) => createMissingPersonProfile(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_MISSING_PROFILES],
      });
    },
  });
};

// GET RECENT MISSING PROFILES //
export const useGetRecentMissingProfiles = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_MISSING_PROFILES],
    queryFn: getRecentMissingProfiles,
  });
};

// GET USER'S LISTINGS //
export const useGetUserListings = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_MISSING_LISTINGS, userId],
    queryFn: () => getUserListings(userId),
    enabled: !!userId,
  });
};

// SAVE/BOOKMARK A PROFILE //
export const useSaveProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      saveProfile(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_MISSING_PROFILES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_MISSING_PROFILES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

// UNSAVE/UNBOOKMARK A PROFILE //
export const useDeleteSavedProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (savedProfileId: string) => deleteSavedProfile(savedProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_MISSING_PROFILES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_MISSING_PROFILES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

// GET A MISSING PERSON BY ID //
export const useGetMissingPersonById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MISSING_PROFILE_BY_ID, postId],
    queryFn: () => getMissingProfileById(postId),
    enabled: !!postId,
  });
};

// UPDATE A MISSING PERSON BY ID //
export const useUpdateMissingPerson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: UpdatePostProps) => updateMissingPerson(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MISSING_PROFILE_BY_ID, data?.$id],
      });
    },
  });
};

// GET ALL/INFINITE POSTS //
export const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getAllPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If there's no data, there are no more pages.

      if (lastPage && lastPage.documents.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
};

// SEARCH A PROFILE //
export const useSearchProfile = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_MISSING_PROFILES, searchTerm],
    queryFn: () => searchProfile(searchTerm),
    enabled: !!searchTerm,
  });
};

// GET USER'S BOOKMARKED PROFILES //
export const useGetUserSavedPosts = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_SAVED_LISTINGS, userId],
    queryFn: () => getUserSavedPosts(userId),
    enabled: !!userId,
  });
};

// GET USER BY ID //
export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserProfileById(userId),
    enabled: !!userId,
  });
};

// UPDATE USER'S DETAILS //
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UpdateUserProps) => updateUserProfile(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};
