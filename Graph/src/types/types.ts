export interface InewUser {
  name: string;
  email: string;
  password: string;
  password2?: string;
}

export interface InewCompany {
  name: string;
  email: string;
  password: string;
  password2?: string;
}

export interface IlogInUser {
  email: string;
  password: string;
}

export interface INavLink {
  label: string;
  route: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  imageUrl: string;
  phone: string;
  accountId: string;
}

export interface ICompany {
  id: string;
  name: string;
  email: string;
  description: string;
  imageUrl: string;
  phone: string;
  accountId: string;
}

export interface IContextType {
  user: IUser;
  company: ICompany;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  checkAuthCompany: () => Promise<boolean>;
}

export interface IAuthUser {
  $createdAt: string; // Datetime string (ISO 8601 format)
  $id: string; // Unique identifier (string)
  $updatedAt: string; // Datetime string (ISO 8601 format)
  accessedAt: string; // Datetime string (ISO 8601 format)
  email: string; // Email address (string)
  emailVerification: boolean; // Boolean value indicating email verification status
  labels: string[]; // Array of strings (labels)
  name: string; // Name or username (string)
  passwordUpdate: string; // Datetime string (ISO 8601 format)
  phone: string; // Phone number (string) or empty string
  phoneVerification: boolean; // Boolean value indicating phone verification status
  prefs: Record<string, unknown>; // Object representing preferences (any type)
  registration: string; // Datetime string (ISO 8601 format)
  status: boolean; // Boolean value indicating status
}

// export interface IPortfolioType {
//   caption: string;
//   tags: string;
//   imageUrl: URL;
//   imageId: string;
//   location: string;
// }

export interface IEditUserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface INewPost {
  file: File[];
}

export interface INewPortfolio {
  location: string;
  tags: string[];
  caption: string;
  image: File;
  userId: string;
}

export interface ContactType {
  name: string;
  email: string;
  description: string;
}

export interface HiJobType {
  description: string;
  caption: string;
  users: string;
  salary: number;
  identicalCode: string;
  email: string;
  name: string;
  phone: string;
  price: number;
  category: string;
  paymentMethod: string;
  location: string;
}

export interface IDarkMode {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: () => void;
}

export interface HiPublicationType {
  caption: string;
  identicalCode: string;
  email: string;
  name: string;
  phone: string;
  description: string;
  salary: string;
  price: number;
  vacancytype: string;
}

export interface HiOutlinePubType {
  name?: string;
  email?: string;
  phone?: string;
  caption?: string;
  description?: string;
  salary?: number;
  paymentMethod?: string;
  category?: string;
  identicalCode?: string;
  location?: string;
  vacancytype?: string;
  users?: string;
  companies?: string;
  price?: number;
}
