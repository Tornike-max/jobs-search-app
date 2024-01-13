import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useUserContext() {
  const context = useContext(AuthContext);
  return context;
}
