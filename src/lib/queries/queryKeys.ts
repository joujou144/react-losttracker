export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",

  //POST KEYS
  GET_ALL_MISSING_PROFILES = "getAllMissingProfiles",
  GET_RECENT_MISSING_PROFILES = "getRecentMissingProfiles",
  GET_USER_MISSING_LISTINGS = "getUserMissingListings",
  GET_USER_SAVED_LISTINGS = "getUserSavedListings",
  GET_INFINITE_POSTS = "getInfinitePosts",
  GET_MISSING_PROFILE_BY_ID = "getMissingProfileById",
  GET_FILE_PREVIEW = "getFilePreview",

  //  SEARCH KEYS
  SEARCH_MISSING_PROFILES = "getSearchMissingProfiles",
}
