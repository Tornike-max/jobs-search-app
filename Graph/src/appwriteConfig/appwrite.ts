import { Account, Avatars, Client, Databases, Storage } from "appwrite";

export const client = new Client();

export const appwriteConfig = {
  projectId: "6582c2d13491b3154ab3",
  endPoint: "https://cloud.appwrite.io/v1",
  databaseId: "6583388bba24add738c5",
  userCollectionId: "658443afdfca459eff7b",
  portfolioCollectionId: "658445567fbb69e8409a",
  commentCollectionId: "6589ff93d24eb0d4b54a",
  aboutCollectionId: "658fee0fa35e5a14215c",
  publicationCollectionId: "6593f42ba07107830fe8",
  imagesCollectionId: "65997d08f056bec3ddee",
  jobCollectionId: "659c32adc2c4471a2414",
  companiesCollectionId: "659e89824cdcd073f948",
  storageId: "6583674e276530bed6ec",
};

client
  .setEndpoint(appwriteConfig.endPoint)
  .setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
