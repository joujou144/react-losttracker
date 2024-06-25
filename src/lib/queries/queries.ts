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
  getCurrentAccount,
  getCurrentUser,
  getInfinitePosts,
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

// AUTH QUERIES //

export const usePostSignUp = () => {
  return useMutation({
    mutationFn: (user: NewUserProps) => createUserAccount(user),
  });
};

export const usePostSignIn = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const usePostSignOut = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetCurrentAccount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentAccount,
  });
};

// POST QUERIES //

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

export const useGetRecentMissingProfiles = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_MISSING_PROFILES],
    queryFn: getRecentMissingProfiles,
  });
};

export const useGetUserListings = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_MISSING_LISTINGS, userId],
    queryFn: () => getUserListings(userId),
    enabled: !!userId,
  });
};

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

export const useGetMissingPersonById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MISSING_PROFILE_BY_ID, postId],
    queryFn: () => getMissingProfileById(postId),
    enabled: !!postId,
  });
};

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

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    getNextPageParam: (lastPage, allPages) => {
      // If there's no data, there are no more pages.
      if (lastPage && lastPage?.documents.length) {
        return allPages.length + 1;
      }
      // Use the $id of the last document as the cursor.
      const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useSearchProfile = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_MISSING_PROFILES, searchTerm],
    queryFn: () => searchProfile(searchTerm),
    enabled: !!searchTerm,
  });
};

export const useGetUserSavedPosts = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_SAVED_LISTINGS, userId],
    queryFn: () => getUserSavedPosts(userId),
    enabled: !!userId,
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserProfileById(userId),
    enabled: !!userId,
  });
};

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
