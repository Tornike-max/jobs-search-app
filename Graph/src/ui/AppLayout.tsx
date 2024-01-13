import { Outlet } from "react-router-dom";
// import SideBar from "./SideBar";
import Header from "./Header";
import SmallSizeHeader from "./SmallSizeHeader";
import { useDarkMode } from "../context/useDarkMode";
// import Footer from "./Footer";

export default function AppLayout() {
  const { isDark } = useDarkMode();
  return (
    <div className="sm:flex max-w-[1920px] w-full h-screen bg-stone-200 transition-all duration-150">
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
      {/* <aside
        className={`sticky hidden sm:flex top-0 h-screen max-w-[260px] w-full  shadow-2xl p-4`}
      >
        <SideBar />
      </aside> */}
      <main
        className={`col-span-2 overflow-y-auto ${
          isDark ? "bg-stone-200" : "bg-primary-800 shadow-2xl"
        } py-20 m-auto max-w-[1920px] w-full h-full transition-all duration-150`}
      >
        <Outlet />
      </main>
      {/* <div
        className={`fixed bottom-0 w-full bg-stone-200 shadow-2xl p-2 col-span-3 z-40 `}
      >
        <Footer />
      </div> */}
    </div>
  );
}
