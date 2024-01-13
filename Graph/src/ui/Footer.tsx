import {
  HiOutlineArrowRightOnRectangle,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/authHooks/useLogout";

export default function Footer() {
  const { logoutUser, isLogingOut } = useLogout();

  const { pathname } = useLocation();

  const linkClasses =
    "py-2 px-3 text-sm sm:text-base md:text-lg flex items-center gap-1 font-serif rounded-md hover:bg-indigo-600 hover:text-stone-200 duration-200 transition-all";
  const activeLinkClasses = "bg-indigo-600 text-stone-200";
  return (
    <ul className="w-full flex justify-between items-center px-6">
      <Link
        className={` ${linkClasses} ${
          pathname === "/contact" ? activeLinkClasses : ""
        }`}
        to="/contact"
      >
        <HiOutlinePhone />
        <span>Contact</span>
      </Link>
      <Link
        className={`${linkClasses} ${
          pathname === "/aboutPage" ? activeLinkClasses : ""
        }`}
        to="/aboutPage"
      >
        <HiOutlineVideoCamera />
        <span>About</span>
      </Link>
      <button
        disabled={isLogingOut}
        onClick={() => logoutUser()}
        className={`${linkClasses} ${
          pathname === "/graph" ? activeLinkClasses : ""
        }`}
      >
        <HiOutlineArrowRightOnRectangle />
        <span>Log out</span>
      </button>
    </ul>
  );
}
