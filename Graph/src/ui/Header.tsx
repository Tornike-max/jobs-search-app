import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
  // HiOutlineHomeModern,
  // HiOutlineTableCells,
  // HiOutlineVideoCamera,
} from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";
import { useLogout } from "../hooks/authHooks/useLogout";
import { Switch } from "@nextui-org/react";
import { useDarkMode } from "../context/useDarkMode";

export default function Header() {
  const { isDark } = useDarkMode();
  const { logoutUser, isLogingOut } = useLogout();
  const { user, company } = useUserContext();
  const { pathname } = useLocation();
  const { handleChange } = useDarkMode();

  const linkClasses =
    "py-2 px-3 text-[13px] flex items-center gap-1 font-serif rounded-md hover:bg-indigo-600 hover:text-stone-200 duration-200 transition-all";
  const activeLinkClasses = "bg-indigo-600 text-stone-200";

  const loginType = user.id === "" ? false : true;
  console.log(loginType);
  return (
    <ul className="w-full flex justify-between items-center px-2">
      <div className="max-w-2xl w-full flex justify-center gap-1 items-center">
        <Link
          className={` ${linkClasses} ${
            pathname === "/" ? activeLinkClasses : ""
          }`}
          to="/"
        >
          {/* <HiOutlineHomeModern /> */}
          <span>მთავარი</span>
        </Link>
        <Link
          className={`${linkClasses} ${
            pathname === "/statements" ? activeLinkClasses : ""
          }`}
          to="/statements"
        >
          {/* <HiOutlineTableCells /> */}
          <span>კანდიდატები</span>
        </Link>
        <Link
          className={`${linkClasses} ${
            pathname === "/vacancies" ? activeLinkClasses : ""
          }`}
          to="/vacancies"
        >
          {/* <HiOutlineTableCells /> */}
          <span>განცხადებები</span>
        </Link>
        <Link
          className={`${linkClasses} ${
            pathname === "/publication" ? activeLinkClasses : ""
          }`}
          to="/publication"
        >
          {/* <HiOutlineTableCells /> */}
          <span>გამოქვეყნება</span>
        </Link>
        <Link
          className={`${linkClasses} ${
            pathname === "/aboutPage" ? activeLinkClasses : ""
          }`}
          to="/aboutPage"
        >
          {/* <HiOutlineTableCells /> */}
          <span>ჩვენ შესახებ</span>
        </Link>
        <Link
          className={`${linkClasses} ${
            pathname === "/contact" ? activeLinkClasses : ""
          }`}
          to="/contact"
        >
          {/* <HiOutlineTableCells /> */}
          <span>კონტაქტი</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Switch
          className={`flex items-center `}
          defaultSelected
          size="md"
          color="primary"
          onClick={handleChange}
          startContent={<HiOutlineSun />}
          endContent={<HiOutlineMoon />}
        />
        {loginType ? (
          <Link
            to={`/account/${user?.accountId}`}
            className="flex gap-2 items-center"
          >
            <div className="flex flex-col">
              <p className="body-bold font-serif text-xs">
                {user?.name || company?.name}
              </p>
              <p
                className={`${
                  !isDark ? "text-stone-200" : "text-stone-600"
                } font-serif text-[10px] xl:text-xs`}
              >
                @{user?.email || company?.email}
              </p>
            </div>
            <img
              src={user?.imageUrl || company?.imageUrl}
              className="h-12 w-12 rounded-full"
            />
          </Link>
        ) : (
          <Link
            to={`/company/${company.id}`}
            className="flex gap-2 items-center"
          >
            <div className="flex flex-col">
              <p className="body-bold font-serif text-xs">{company?.name}</p>
              <p
                className={`${
                  !isDark && "text-stone-200"
                } font-serif text-[10px] xl:text-xs`}
              >
                @{company?.email}
              </p>
            </div>
            <img src={company?.imageUrl} className="h-12 w-12 rounded-full" />
          </Link>
        )}

        <button
          disabled={isLogingOut}
          onClick={() => logoutUser()}
          className={`${linkClasses} `}
        >
          <HiOutlineArrowRightOnRectangle />
          <span>გასვლა</span>
        </button>
      </div>
    </ul>
  );
}
