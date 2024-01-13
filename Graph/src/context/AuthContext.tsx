import React, { createContext, useState, useEffect } from "react";
import { ICompany, IContextType, IUser } from "../types/types";
import { getCurrentCompany, getCurrentUser } from "../services/api";

const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  phone: "",
  accountId: "",
};

const INITIAL_COMPANY = {
  id: "",
  name: "",
  email: "",
  imageUrl: "",
  description: "",
  phone: "",
  accountId: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  company: INITIAL_COMPANY,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  checkAuthCompany: async () => false as boolean,
};

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [company, setCompany] = useState<ICompany>(INITIAL_COMPANY);

  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      //   navigate("/login");
    }
    checkAuthCompany();
    checkAuthUser();
  }, []);

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount?.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
          phone: currentAccount.phone,
          accountId: currentAccount.accountId,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthCompany = async () => {
    try {
      const currentAccount = await getCurrentCompany();
      if (currentAccount) {
        setCompany({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          description: currentAccount.bio,
          phone: currentAccount.phone,
          accountId: currentAccount.accountId,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    company,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    checkAuthCompany,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
