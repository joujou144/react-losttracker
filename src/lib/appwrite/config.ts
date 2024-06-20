import { Account, Client, Databases, Storage, Avatars } from "appwrite";

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_RPOJECT_ID;
export const STORAGE_ID = import.meta.env.VITE_STORAGE_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const SAVES_COLLECTION_ID = import.meta.env.VITE_SAVES_COLLECTION_ID;
export const USERS_COLLECTION_ID = import.meta.env.VITE_USERS_COLLECTION_ID;
export const MISSING_PERSONS_COLLECTION_ID = import.meta.env
  .VITE_MISSING_PERSONS_COLLECTION_ID;

const client = new Client();
client.setEndpoint(API_ENDPOINT);
client.setProject(PROJECT_ID);
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { account, client, databases, storage, avatars };
