import { ID, Query } from "appwrite";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
  storage,
} from "../appwriteConfig/appwrite";
import {
  HiJobType,
  HiOutlinePubType,
  INewPortfolio,
  IlogInUser,
  InewCompany,
  InewUser,
} from "../types/types";
import toast from "react-hot-toast";
import { MAX_RESULTS_PER_PAGE } from "../constants";

export async function createNewUser(user: InewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user?.name);

    console.log(newAccount);
    console.log(user);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: avatarUrl,
      imageId: crypto.randomUUID(),
    });
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.error(error);
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  imageId: string;
}) {
  try {
    console.log(user);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    if (!newUser) throw Error();
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.error(error);
  }
}

export async function createCompanyAccount(newCompany: InewCompany) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      newCompany.email,
      newCompany.password,
      newCompany.name
    );

    if (!newAccount) throw Error;

    const avatar = avatars.getInitials(newCompany.name);

    const newAcc = await saveCompanyToDb({
      name: newAccount.name,
      email: newAccount.email,
      accountId: newAccount.$id,
      imageUrl: avatar,
      imageId: crypto.randomUUID(),
    });
    console.log(newAcc);
    return newAcc;
  } catch (error) {
    console.error(error);
  }
}

export async function saveCompanyToDb(company: {
  name: string;
  email: string;
  accountId: string;
  imageUrl: URL;
  imageId: string;
}) {
  try {
    const newCompany = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.companiesCollectionId,
      ID.unique(),
      company
    );

    if (!newCompany) throw Error();
    console.log(newCompany);
    return newCompany;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(user: IlogInUser) {
  console.log(user);
  try {
    const promise = await account.createEmailSession(user.email, user.password);

    if (!promise) return;
    return promise;
  } catch (error) {
    console.error("Error while login user", error);
  }
}

export async function userLogout() {
  try {
    const promise = await account.deleteSessions();
    if (!promise) return;
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) return;

    console.log(currentAccount);

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) return;

    console.log(currentUser.documents);
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentCompany() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) return;
    console.log(currentAccount.$id);

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.companiesCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) return;
    console.log(currentUser.documents);
    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function updateAuthUser({
  name: username,
  email,
  phone,
  password,
  userId,
}: {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  userId?: string;
}) {
  try {
    if (username) {
      const response = await account.updateName(username);

      if (!response) throw new Error("Could not update");
      const saveToDb = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId || ID.unique(),
        { name: username }
      );
      return saveToDb;
    } else if (email) {
      const response = await account.updateEmail(email, password || "");
      if (!response) throw new Error("Could not update");
      const saveToDb = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId || ID.unique(),
        { email: email }
      );
      return saveToDb;
    } else if (phone) {
      const response = await account.updatePhone(phone, password || "");
      if (!response) throw new Error("Could not update");
      return response;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function changeUserPassword(
  password: string,
  oldPassword?: string
) {
  try {
    const promise = await account.updatePassword(password, oldPassword);
    if (!promise) throw new Error("Could not update");

    return promise;
  } catch (error) {
    console.error(error);
  }
}
export async function getUserFromDB(accountId: string) {
  try {
    const session = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", accountId)]
    );

    if (!session) return;
    return session.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function getUsersFromDB() {
  const data = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.orderDesc("$createdAt")]
  );

  if (!data || !data.documents) return;

  // Filter documents where portfolio length is greater than 0
  const usersWithPortfolio = data?.documents?.filter(
    (doc) => doc?.portfolio && doc?.portfolio?.length > 0
  );

  return usersWithPortfolio;
}

export async function updateUserBio({
  userId,
  bio,
}: {
  userId: string;
  bio: string;
}) {
  const data = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId,
    { bio: bio }
  );

  if (!data) return;
  return data;
}

export async function updateUserStatus({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  const data = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    userId,
    { status: status }
  );

  if (!data) return;

  return data;
}

export async function addNewLinks({
  linkedinUrl,
  instagramUrl,
  userId,
}: {
  linkedinUrl: string;
  instagramUrl: string;
  userId: string;
}) {
  console.log(instagramUrl, linkedinUrl, userId);
  try {
    const promise = databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        linkedinUrl: linkedinUrl,
        instagramUrl: instagramUrl,
      }
    );

    if (!promise) throw new Error("Error while adding link");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function addNewLocation({
  location,
  userId,
}: {
  location: string;
  userId: string;
}) {
  console.log(location, userId);
  try {
    const promise = databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        location: location,
      }
    );

    if (!promise) throw new Error("Error while adding Location");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function addExperienceAndEducation({
  experience,
  education,
  userId,
}: {
  experience: string;
  education: string;
  userId: string;
}) {
  console.log(experience, userId);
  try {
    const promise = databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        experience: experience,
        education: education,
      }
    );

    if (!promise) throw new Error("Error while adding Info");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function addNewSkill(skill: string, userId: string) {
  try {
    const userDocument = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    const existingSkills: string[] = userDocument.skills || [];

    const isAlreadyInThere = existingSkills.includes(skill);

    console.log(isAlreadyInThere);

    if (isAlreadyInThere === true) {
      toast.error("You already have this skill in your list");
      return;
    }

    existingSkills.push(skill);

    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        skills: existingSkills,
      }
    );

    return promise;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addNewShootingStyle(event: string, userId: string) {
  try {
    const shootingStylePromise = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    const existingEvents: string[] =
      shootingStylePromise?.provided_events || [];

    const isAlreadyInThere = existingEvents.includes(event);

    if (isAlreadyInThere === true) {
      toast.error("You already have this skill in your list");
      return;
    }

    existingEvents.push(event);

    console.log(shootingStylePromise);

    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        provided_events: existingEvents,
      }
    );

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function changeProfile({
  userId,
  file,
}: {
  userId: string;
  file: File;
}) {
  try {
    const uploadedFile = await createPicture(file);

    if (!uploadedFile) {
      throw new Error("File upload failed");
    }

    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      throw new Error("Could not find file in preview");
    }

    const newImage = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      { imageUrl: fileUrl }
    );

    return newImage;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it upwards
  }
}

export async function createPicture(file: File) {
  try {
    const promise = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    if (!promise) {
      throw new Error("Could not create File");
    }

    return promise;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it upwards
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) {
      throw new Error("This couses error");
    }

    return fileUrl;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it upwards
  }
}

// portfolio api

export async function createPortfolio(newObj: INewPortfolio) {
  try {
    const file = newObj.image;
    const uploadedFile = await createPost(file);

    if (!uploadedFile) {
      throw new Error("File upload failed");
    }

    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      throw new Error("Could not find file in preview");
    }

    const newImage = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.portfolioCollectionId,
      ID.unique(),
      {
        creator: newObj.userId,
        caption: newObj.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: newObj.location,
        tags: newObj.tags,
      }
    );

    const imageDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.imagesCollectionId,
      ID.unique(),
      {
        imageUrl: [newImage.imageUrl],
      }
    );

    return imageDocument;
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(file: File) {
  try {
    const promise = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    if (!promise) {
      throw new Error("Could not create File");
    }

    return promise;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteImage(documentId: string) {
  try {
    const promise = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.portfolioCollectionId,
      documentId
    );

    if (!promise) throw Error();

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPosts({ pageParam }: { pageParam: string | null }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(3)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.portfolioCollectionId,
    queries
  );

  if (!posts) return;

  return posts;
}

export async function userLikePost(postId: string, likesArray: string[]) {
  try {
    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.portfolioCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function userCommentsOnPost({
  postId,
  userId,
  comment,
}: {
  postId: string;
  userId: string;
  comment: string;
}) {
  try {
    const comments = await getComments(postId);

    if (!comments) return;

    const data = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentCollectionId,
      ID.unique(),
      {
        comment: comment,
        portfolio: postId,
        users: userId,
      }
    );

    if (!data) return;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getComments(postId: string) {
  try {
    const data = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.commentCollectionId,
      [Query.equal("portfolio", postId)]
    );

    if (!data || !data.documents) {
      return { error: "No comments found" };
    }

    return data.documents;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { error: "Failed to fetch comments" };
  }
}

// filtered users

export async function filterUsers(
  status: string = "all",
  curPage: number,
  skillLevel: string,
  searchedValue: string,
  getFilterPrice: string,
  getGender: string,
  shootStyle: string,
  getSortedAge: string,
  getSortedPrice: string
) {
  const offset = (curPage - 1) * MAX_RESULTS_PER_PAGE;
  console.log(shootStyle);
  try {
    const queries: string[] = [];

    queries.push(Query.limit(MAX_RESULTS_PER_PAGE));

    switch (status) {
      case "all":
        break;
      default:
        queries.push(Query.equal("status", status));
    }

    if (offset > 0) {
      queries.push(Query.offset(offset));
    }

    if (skillLevel) {
      queries.push(Query.equal("skillLevel", skillLevel));
    }
    if (searchedValue) {
      queries.push(Query.search("name", searchedValue));
    }
    if (getFilterPrice) {
      queries.push(Query.lessThanEqual("price", Number(getFilterPrice)));
    }
    if (getGender) {
      queries.push(Query.equal("gender", getGender));
    }
    if (shootStyle) {
      console.log("movida");
      queries.push(Query.equal("provided_events", shootStyle));
    }

    if (getSortedAge) {
      if (getSortedAge === "asc") {
        queries.push(Query.orderAsc("age"));
      }
      if (getSortedAge === "desc") {
        queries.push(Query.orderDesc("age"));
      }
    }
    if (getSortedPrice) {
      if (getSortedPrice === "asc") {
        queries.push(Query.orderAsc("price"));
      }
      if (getSortedPrice === "desc") {
        queries.push(Query.orderDesc("price"));
      }
    }

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );

    return result.documents || [];
  } catch (error) {
    console.error(error);
  }
}

export async function getAboutInfo() {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.aboutCollectionId
    );

    if (!promise) throw new Error("Error while getting data");

    return promise.documents[0];
  } catch (error) {
    console.error(error);
  }
}

// publications

export async function getPublicationPrices() {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.publicationCollectionId
    );

    if (!promise) throw new Error();

    return promise.documents[0];
  } catch (error) {
    console.error(error);
  }
}

// create job

export async function createNewJob(newJob: HiJobType) {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.jobCollectionId,
      ID.unique(),
      newJob
    );

    if (!promise) throw new Error("Can't create new job");
    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function getVacancies() {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.jobCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    if (!promise) throw new Error();

    return promise.documents;
  } catch (error) {
    console.error(error);
  }
}

export async function filterJobs(
  region: string = "ყველა",
  getCategory: string = "ყველა",
  search: string,
  getSalary: string,
  getSortSalary: string,
  pageParam: { pageParam: number }
) {
  try {
    const queries: string[] = [Query.orderDesc("$updatedAt"), Query.limit(10)];

    if (pageParam && pageParam.pageParam !== undefined) {
      queries.push(Query.cursorAfter(pageParam.pageParam.toString()));
    }

    if (getSortSalary) {
      if (getSortSalary === "") {
        queries.push(Query.orderDesc("$updatedAt"));
      }
      if (getSortSalary === "asc") {
        queries.push(Query.orderAsc("salary"));
      }
      if (getSortSalary === "desc") {
        queries.push(Query.orderDesc("salary"));
      }
    }

    if (region !== "ყველა") {
      queries.push(Query.equal("location", region));
    }

    if (getCategory !== "ყველა") {
      queries.push(Query.equal("category", getCategory));
    }

    if (search) {
      queries.push(Query.equal("caption", search));
    }

    if (getSalary) {
      queries.push(Query.lessThanEqual("salary", Number(getSalary)));
    }

    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.jobCollectionId,
      queries
    );
    return promise.documents || [];
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleJob(vacancieId: string) {
  try {
    const promise = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.jobCollectionId,
      vacancieId
    );

    if (!promise) return;

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function updateJob(
  documentId: string,
  updatedData: HiOutlinePubType
) {
  try {
    console.log(documentId);
    console.log(updatedData);
    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.jobCollectionId,
      documentId,
      updatedData
    );

    if (!promise) throw Error();

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleCompany(companyId: string) {
  try {
    const promise = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.companiesCollectionId,
      companyId
    );

    if (!promise) throw Error();
    return promise;
  } catch (error) {
    console.error(error);
  }
}
