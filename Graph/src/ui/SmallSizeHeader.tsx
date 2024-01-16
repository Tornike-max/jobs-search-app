import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  HiOutlineArchiveBox,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars4,
  HiOutlineHomeModern,
  HiOutlineMoon,
  HiOutlinePhone,
  HiOutlineSun,
  HiOutlineTableCells,
} from "react-icons/hi2";

import { MdOutlineFormatListBulleted } from "react-icons/md";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/useUserContext";
import { useLogout } from "../hooks/authHooks/useLogout";
import { Switch } from "@nextui-org/react";
import { useDarkMode } from "../context/useDarkMode";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, company } = useUserContext();
  const { logoutUser, isLogingOut } = useLogout();
  const { handleChange, isDark } = useDarkMode();
  const getSession = localStorage.getItem("cookieFallback");

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const loginType = user.id === "" ? false : true;

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      bgcolor={`${!isDark && "bg-primary-800 h-screen "}`}
    >
      <List
        className={`flex flex-col justify-start items-center gap-4 ${
          !isDark && "bg-primary-800"
        } transition-all duration-150`}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText>
              <Switch
                className={`flex gap-2 items-center `}
                defaultSelected
                size="lg"
                color="primary"
                onClick={handleChange}
                startContent={<HiOutlineSun />}
                endContent={<HiOutlineMoon />}
              >
                <span className={`${!isDark && "text-white"}`}>
                  {!isDark ? "Dark Mode" : "Light Mode"}
                </span>
              </Switch>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            {getSession?.includes("a_session_") && (
              <ListItemText>
                {loginType ? (
                  <Link
                    className="flex gap-2 items-center"
                    to={`/account/${user?.accountId}`}
                  >
                    <img
                      src={user?.imageUrl}
                      className="h-12 w-12 rounded-full"
                    />

                    <div className="flex flex-col">
                      <p className="body-bold font-serif text-xs">
                        {user?.name}
                      </p>
                      <p
                        className={`${
                          !isDark ? "text-stone-200" : "text-stone-600"
                        } font-serif text-[10px] xl:text-xs `}
                      >
                        {user?.email}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    className="flex gap-2 items-center"
                    to={`/company/${company?.id}`}
                  >
                    <img
                      src={company?.imageUrl}
                      className="h-12 w-12 rounded-full"
                    />

                    <div className="flex flex-col">
                      <p
                        className={`${
                          !isDark && "text-stone-200"
                        } body-bold font-serif text-xs `}
                      >
                        {company?.name}
                      </p>
                      <p
                        className={`${
                          !isDark ? "text-stone-200" : "text-stone-600"
                        }  font-serif text-[10px] xl:text-xs`}
                      >
                        {company?.email}
                      </p>
                    </div>
                  </Link>
                )}
              </ListItemText>
            )}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineHomeModern
                className={`text-2xl ${!isDark && "text-stone-200"} ${
                  pathname === "/" && "text-primary-600 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${!isDark && "text-stone-200"} ${
                  pathname === "/" && "text-primary-600 font-bold"
                }`}
                to="/"
              >
                მთავარი
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineTableCells
                className={`text-2xl ${!isDark && "text-stone-200"} ${
                  pathname === "/statements" && "text-primary-600 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${!isDark && "text-stone-200"} ${
                  pathname === "/statements" && "text-primary-600 font-bold"
                }`}
                to="/statements"
              >
                კანდიდატები
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MdOutlineFormatListBulleted
                className={`text-2xl ${!isDark && "text-stone-200"} ${
                  pathname === "/vacancies" && "text-primary-600 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${!isDark && "text-stone-200"} ${
                  pathname === "/vacancies" && "text-primary-600 font-bold"
                }`}
                to="/vacancies"
              >
                განცხადებები
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider
        className={`${!isDark && "bg-primary-600"} transition-all duration-150`}
      />
      <List
        className={`flex flex-col justify-start items-center gap-4 max-h-full ${
          !isDark && "bg-primary-800"
        } transition-all duration-150`}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineArchiveBox
                className={`text-2xl ${!isDark && "text-stone-200"} ${
                  pathname === "/aboutPage" && "text-primary-600 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${!isDark && "text-stone-200"} ${
                  pathname === "/aboutPage" && "text-primary-600 font-bold"
                }`}
                to="/aboutPage"
              >
                ჩვენ შესახებ
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlinePhone
                className={`text-2xl ${!isDark && "text-stone-200"} ${
                  pathname === "/contact" && "text-primary-600 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${!isDark && "text-stone-200"} ${
                  pathname === "/contact" && "text-primary-600 font-bold"
                }`}
                to="/contact"
              >
                კონტაქტი
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          {getSession?.includes("a_session_") ? (
            <ListItemButton
              disabled={isLogingOut}
              onClick={() => logoutUser()}
              className={`text-2xl ${!isDark && "text-stone-200"} ${
                pathname === "/" && "text-primary-600 font-bold"
              }`}
            >
              <ListItemIcon>
                <HiOutlineArrowLeftOnRectangle
                  className={`${!isDark && "text-stone-200"} text-2xl`}
                />
              </ListItemIcon>
              <ListItemText>
                <span className={`${!isDark && "text-stone-200"} text-xl`}>
                  გასვლა
                </span>
              </ListItemText>
            </ListItemButton>
          ) : (
            <ListItemButton
              disabled={isLogingOut}
              onClick={() => navigate("/login")}
              className={`text-2xl ${!isDark && "text-stone-200"} ${
                pathname === "/" && "text-primary-600 font-bold"
              }`}
            >
              <ListItemIcon>
                <HiOutlineArrowRightOnRectangle
                  className={`${!isDark && "text-stone-200"} text-2xl`}
                />
              </ListItemIcon>
              <ListItemText>
                <span className={`${!isDark && "text-stone-200"} text-xl`}>
                  შესვლა
                </span>
              </ListItemText>
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex justify-start items-center w-full">
      <div className="">
        <Button onClick={toggleDrawer("left", true)}>
          <HiOutlineBars4
            className={`text-xl ${
              !isDark ? "text-stone-200" : "text-primary-600"
            } ${pathname === "/" && " font-bold"}`}
          />
        </Button>
        <SwipeableDrawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </div>
      <img className={"px-[35%] xs:px-[30%] sm:px-[40%]"} src="vite.svg" />
    </div>
  );
}
