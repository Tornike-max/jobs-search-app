import { Outlet } from "react-router-dom";
import Header from "./Header";
import SmallSizeHeader from "./SmallSizeHeader";
import { useDarkMode } from "../context/useDarkMode";

export default function AppLayout() {
  const { isDark } = useDarkMode();
  return (
    <div
      className={`sm:flex max-w-[1920px] w-full h-screen ${
        !isDark ? "bg-primary-800" : "bg-stone-200 "
      } transition-all duration-150`}
    >
      <header
        className={`fixed top-0 w-full hidden lg:flex rounded-md ${
          isDark ? "bg-stone-200" : "bg-primary-800 text-stone-100"
        } shadow-lg p-2 col-span-3 z-40 transition-all duration-150`}
      >
        <Header />
      </header>

      <header
        className={`lg:hidden fixed top-0 w-full  ${
          isDark ? "bg-stone-200" : "bg-primary-800"
        } shadow-lg p-2 col-span-3 z-40 transition-all duration-150`}
      >
        <SmallSizeHeader />
      </header>

      <main
        className={`col-span-2 overflow-y-auto ${
          isDark ? "bg-stone-200" : "bg-primary-800 shadow-2xl"
        } py-20 m-auto max-w-[1920px] w-full h-full transition-all duration-150`}
      >
        <Outlet />
      </main>
    </div>
  );
}
