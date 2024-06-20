import { NewPostProps, NewUserProps, UpdatePostProps } from "@/types";
import {
  account,
  avatars,
  DATABASE_ID,
  databases,
  MISSING_PERSONS_COLLECTION_ID,
  SAVES_COLLECTION_ID,
  storage,
  STORAGE_ID,
  USERS_COLLECTION_ID,
} from "./config";
import { ID, ImageGravity, Query } from "appwrite";
import { formatDateObj } from "../helpers/formatDate";

// AUTH SIGN UP //
export async function createUserAccount(user: NewUserProps) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log("createuseraccounterror", error);
    throw error;
  }
}

// SAVE TO DB //
export async function saveUserToDB(user: {
  accountId: string;
  name: string;
  email: string;
  imageUrl: URL;
}) {
  try {
    const newUser = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log("saveusertodberror", error);
    return error;
  }
}

// AUTH SIGN IN //
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.log("signinaccounterror", error);
  }
}

// AUTH CURRENT USER //
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error("No current account.");

    const currentUser = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser.documents.length)
      throw Error("No current user documents found.");

    const userDocuments = currentUser.documents[0];
    // return userDocuments;
    return {
      $id: userDocuments.$id,
      email: userDocuments.email,
      imageUrl: userDocuments.imageUrl,
      name: userDocuments.name,
    };
  } catch (error) {
    console.log("getcurrentUsererror", error);
    return null;
  }
}

// AUTH CURRENT ACCOUNT //
export async function getCurrentAccount() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error("No current account.");

    const currentUser = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser.documents.length)
      throw Error("No current user documents found.");

    const userDocuments = currentUser.documents[0];
    return userDocuments;
  } catch (error) {
    console.log("getcurrentaccounterror", error);
    return null;
  }
}

// AUTH SIGNOUT//
export async function signOutAccount() {
  try {
    const session = account.deleteSession("current");
    return session;
  } catch (error) {
    console.log("signouterror", error);
  }
}

// CREATE MISSING PERSON PROFILE //
export async function createMissingPersonProfile(post: NewPostProps) {
  try {
    // upload image to storage
    const uploadedImgFile = await uploadFile(post.file[0]);

    // save to post
    if (!uploadedImgFile) throw Error;

    // Get fileURL
    const fileUrl = getFilePreview(uploadedImgFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedImgFile?.$id);
      throw Error;
    }

    // convert Date obj to string
    const formattedDate = formatDateObj(post?.date);

    const newPost = await databases.createDocument(
      DATABASE_ID,
      MISSING_PERSONS_COLLECTION_ID,
      ID.unique(),
      {
        creator: post.userId,
        name: post.name,
        description: post.description,
        imageUrl: fileUrl,
        imageId: uploadedImgFile.$id,
        date: formattedDate,
        location: post.location,
      }
    );
    if (!newPost) {
      await deleteFile(uploadedImgFile.$id);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log("createmissingpersonerror", error);
  }
}

// UPLOAD FILE //
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      STORAGE_ID,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log("uploadfileerror", error);
    throw error;
  }
}

// GET FILE PREVIEW //
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      STORAGE_ID,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log("getfilepreviewerrror", error);
    throw error;
  }
}

// DELETE FILE //
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(STORAGE_ID, fileId);
    return { status: "ok" };
  } catch (error) {
    console.log("deletefileerror", error);
    throw error;
  }
}

// GET LATEST PROFILES //
export async function getRecentMissingProfiles() {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(3)];
  try {
    const profiles = await databases.listDocuments(
      DATABASE_ID,
      MISSING_PERSONS_COLLECTION_ID,
      queries
    );

    if (!profiles) throw Error;
    return profiles;
  } catch (error) {
    console.log("getrecentprofileserror", error);
    throw error;
  }
}

// GET USER'S LISTINGS //
export async function getUserListings(userId?: string) {
  if (!userId) return;

  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      MISSING_PERSONS_COLLECTION_ID,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log("getuserlistingsserror", error);
    throw error;
  }
}

// GET USER'S SAVED PROFILES //
export async function getUserSavedPosts(userId?: string) {
  if (!userId) return;

  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      SAVES_COLLECTION_ID,
      [Query.equal("user", userId)]
    );

    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log("getuserlistingsserror", error);
    throw error;
  }
}

// SAVE PROFILES //
export async function saveProfile(postId: string, userId: string) {
  try {
    const savePost = await databases.createDocument(
      DATABASE_ID,
      SAVES_COLLECTION_ID,
      ID.unique(),
      {
        user: userId,
        missingPerson: postId,
      }
    );
    if (!savePost) throw Error;
    return savePost;
  } catch (error) {
    console.log("saveprofileerror", error);
    throw error;
  }
}

// DELETE/UNSAVE BOOKMARKED POST //
export async function deleteSavedProfile(savedProfileId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      DATABASE_ID,
      SAVES_COLLECTION_ID,
      savedProfileId
    );
    if (!statusCode) throw Error;
    return statusCode;
  } catch (error) {
    console.log("deletesavedprofileerror", error);
    throw error;
  }
}

// GET MISSING PERSON BY ID //
export async function getMissingProfileById(postId?: string) {
  if (!postId) throw Error;
  try {
    const post = await databases.getDocument(
      DATABASE_ID,
      MISSING_PERSONS_COLLECTION_ID,
      postId
    );

    if (!post) throw Error;
    return post;
  } catch (error) {
    console.log("getmissingprofilebyiderror", error);
    throw error;
  }
}

// EDIT MISSING PERSON PROFILE BY ID //
export async function updateMissingPerson(post: UpdatePostProps) {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };
    if (hasFileToUpdate) {
      // upload image to storage
      const uploadedImgFile = await uploadFile(post.file[0]);
      if (!uploadedImgFile) throw Error;

      // Get new fileURL
      const fileUrl = getFilePreview(uploadedImgFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedImgFile?.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedImgFile.$id };
    }

    // convert Date obj to string
    const formattedDate = formatDateObj(post?.date.toISOString());

    const updatedPost = await databases.updateDocument(
      DATABASE_ID,
      MISSING_PERSONS_COLLECTION_ID,
      post.postId,
      {
        name: post.name,
        description: post.description,
        imageId: image.imageId,
        imageUrl: image.imageUrl,
        location: post.location,
        date: formattedDate,
      }
    );
    //Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }
    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log("updatemissingpersonerror", error);
  }
}

// GET INIFNITE POSTS //

export async function getInfinitePosts({
  pageParam,
}: {
  pageParam: number | undefined;
}) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      DATABASE_ID,
      MISSING_PERSONS_COLLECTION_ID,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log("getinfinitepostserror", error);
    throw error;
  }
}
