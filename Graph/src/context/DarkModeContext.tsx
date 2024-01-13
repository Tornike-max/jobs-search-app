import { createContext } from "react";
import { IDarkMode } from "../types/types";
import { useLocalStorage } from "usehooks-ts";

const INITIAL_STATE = {
  isDark: false,
  setIsDark: () => {},
  handleChange: () => {},
};
export const DarkContext = createContext<IDarkMode>(INITIAL_STATE);

export default function DarkModeContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useLocalStorage("darkTheme", false);

  function handleChange() {
    setIsDark((prevValue: boolean) => !prevValue);
  }

  return (
    <DarkContext.Provider value={{ isDark, setIsDark, handleChange }}>
      {children}
    </DarkContext.Provider>
  );
}
