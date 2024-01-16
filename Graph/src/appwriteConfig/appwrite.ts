import { Account, Avatars, Client, Databases, Storage } from "appwrite";

export const client = new Client();

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
  endPoint: import.meta.env.VITE_APPWRITE_ENDPOINT as string,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID as string,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID as string,
  portfolioCollectionId: import.meta.env
    .VITE_APPWRITE_PORTFOLIO_COLLECTION_ID as string,
  commentCollectionId: import.meta.env
    .VITE_APPWRITE_COMMENT_COLLECTION_ID as string,
  aboutCollectionId: import.meta.env
    .VITE_APPWRITE_ABOUT_COLLECTION_ID as string,
  publicationCollectionId: import.meta.env
    .VITE_APPWRITE_PUBLICATION_COLLECTION_ID as string,
  imagesCollectionId: import.meta.env
    .VITE_APPWRITE_IMAGES_COLLECTION_ID as string,
  jobCollectionId: import.meta.env.VITE_APPWRITE_JOB_COLLECTION_ID as string,
  companiesCollectionId: import.meta.env
    .VITE_APPWRITE_COMPANIES_COLLECTION_ID as string,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID as string,
};

client
  .setEndpoint(appwriteConfig.endPoint)
  .setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
