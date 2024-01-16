import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineHomeModern,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { GiPhotoCamera } from "react-icons/gi";

import { useLogout } from "../hooks/authHooks/useLogout";

import { useUserContext } from "../context/useUserContext";

export default function SideBar() {
  const { user } = useUserContext();
  const { logoutUser, isLogingOut } = useLogout();
  const { pathname } = useLocation();

  const linkClasses =
    "py-2 px-3 text-sm font-serif rounded-md hover:bg-indigo-600 hover:text-stone-200 duration-200 transition-all";
  const activeLinkClasses = "bg-indigo-600 text-stone-200";
  return (
    <nav className="flex flex-col gap-8 justify-start">
      <Link to="/" className="flex gap-2 items-center">
        <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
      </Link>

      <Link
        to={`/account/${user.accountId}`}
        className="flex gap-2 items-center"
      >
        <img src={user?.imageUrl} className="h-16 w-16 rounded-full" />
        <div className="flex flex-col text-lg">
          <p className="body-bold font-semibold">{user?.name}</p>
          <p className="text-stone-600"></p>
        </div>
      </Link>
      <ul className="flex justify-around gap-4 items-start flex-col">
        <Link
          className={`text-xl  ${linkClasses} ${
            pathname === "/" ? activeLinkClasses : ""
          }`}
          to="/"
        >
          <li className="flex items-center gap-1">
            <HiOutlineHomeModern />
            <span>Home</span>
          </li>
        </Link>

        <Link
          className={`text-xl ${linkClasses} ${
            pathname === "/graph" ? activeLinkClasses : ""
          }`}
          to="/graph"
        >
          <li className="flex items-center gap-1">
            <GiPhotoCamera />
            <span>PhotoGraphers</span>
          </li>
        </Link>

        <Link
          className={`text-xl ${linkClasses} ${
            pathname === "/videoGraph" ? activeLinkClasses : ""
          }`}
          to="/videoGraph"
        >
          <li className="flex items-center  gap-1">
            <HiOutlineVideoCamera />
            <span>VideoGraphers</span>
          </li>
        </Link>

        <Link
          className={`text-xl ${linkClasses} ${
            pathname === "/aboutPage" ? activeLinkClasses : ""
          }`}
          to="/aboutPage"
        >
          <li className="flex items-center  gap-1">
            <GiPhotoCamera />
            <span>About</span>
          </li>
        </Link>

        <Link
          className={`text-xl ${linkClasses} ${
            pathname === "/contact" ? activeLinkClasses : ""
          }`}
          to="/contact"
        >
          <li className="flex items-center  gap-1">
            <HiOutlinePhone />
            <span>Contact Us</span>
          </li>
        </Link>

        <button
          className={`${linkClasses} text-xl flex items-center gap-1`}
          disabled={isLogingOut}
          onClick={() => logoutUser()}
        >
          <span>
            <HiOutlineArrowRightOnRectangle className="w-6 h-6" />
          </span>
          <p className="">Log out</p>
        </button>
      </ul>
    </nav>
  );
}
