import { Button } from "@nextui-org/react";
import { TfiInstagram, TfiLinkedin, TfiLocationPin } from "react-icons/tfi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/useUserContext";
import { HiOutlinePlus } from "react-icons/hi2";
import { CiLocationOff } from "react-icons/ci";

import { useState } from "react";
import AddLinksModal from "../../ui/AddLinksModal";
import AddLocationModal from "../../ui/AddLocationModal";
import AddExperienceModal from "../../ui/AddExperienceModal";
import { IUser } from "../../types/types";
import { useDarkMode } from "../../context/useDarkMode";

export default function UserInfo({
  linkedinUrl,
  instagramUrl,
  experience,
  education,
  accountId,
  location,
}: {
  linkedinUrl: string;
  instagramUrl: string;
  experience: string;
  education: string;
  accountId: string;
  location: string;
}) {
  const { user } = useUserContext();
  const { isDark } = useDarkMode();
  const params = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);

  function handelHireUser(user: IUser) {
    console.log(user);
    navigate(`/hire/user/${params.accountId}`);
  }

  return (
    <div
      className={`w-full ${
        !isDark ? "bg-primary-800" : "bg-slate-100"
      }  rounded-b-md py-2 transition-all duration-150`}
    >
      <div className="flex justify-around flex-col gap-10 md:flex-row md:gap-0 font-serif">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="py-3 px-4 rounded-md bg-blue-100 flex items-center gap-2">
            {user.id === accountId && location ? (
              <TfiLocationPin />
            ) : (
              <CiLocationOff />
            )}

            {user.id === accountId && location ? (
              <span className="text-indigo-800 font-serif">{location}</span>
            ) : (
              <div className="flex flex-col">
                <span className="text-indigo-800 font-serif">
                  ლოკაცია არ არის ხელმისაწვდომი
                </span>
              </div>
            )}
          </div>
          {user.id === accountId && !location && (
            <div>
              <Button
                onClick={() => setIsOpenLocation(true)}
                type="button"
                variant="ghost"
                color="primary"
                className={`${!isDark && "text-stone-100"}`}
              >
                დაამატე ლოკაცია
              </Button>
            </div>
          )}
          {user.id === accountId && location && (
            <div>
              <Button
                onClick={() => setIsOpenLocation(true)}
                type="button"
                variant="ghost"
                color="primary"
              >
                შეცვალე ლოკაცია
              </Button>
            </div>
          )}
          <div className="flex items-center gap-2 flex-col">
            <h1
              className={`${
                !isDark && "text-stone-200"
              } transition-all duration-150`}
            >
              ლინკები
            </h1>
            {user.id === accountId ? (
              <div className="flex items-center gap-2">
                {linkedinUrl ? (
                  <Link
                    to={linkedinUrl}
                    className={`w-10 h-10 rounded-full border-[0.5px] ${
                      !isDark
                        ? "border-stone-200"
                        : "border-stone-600 hover:bg-stone-200"
                    }   flex justify-center items-center shadow-lg`}
                  >
                    <TfiLinkedin className="text-indigo-700 text-xl" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsOpen(true)}
                    className={`w-10 h-10 rounded-full border-[0.5px] ${
                      !isDark
                        ? "border-stone-200 text-stone-200 hover:text-indigo-100"
                        : "border-stone-600 hover:bg-stone-200 hover:text-indigo-600"
                    }  hover:text-xl hover:font-semibold duration-100 transition-all flex justify-center items-center shadow-lg`}
                  >
                    <HiOutlinePlus />
                  </button>
                )}
                {instagramUrl ? (
                  <Link
                    to={instagramUrl}
                    className={`w-10 h-10 rounded-full border-[0.5px] ${
                      !isDark ? "" : ""
                    } border-stone-600 hover:bg-stone-200  flex justify-center items-center shadow-lg`}
                  >
                    <TfiInstagram className="text-indigo-700 text-xl" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setIsOpen(true)}
                    className={`w-10 h-10 rounded-full border-[0.5px] ${
                      !isDark
                        ? "border-stone-200 text-stone-200 hover:text-indigo-100"
                        : "border-stone-600 hover:bg-stone-200 hover:text-indigo-600"
                    }  hover:text-xl hover:font-semibold duration-100 transition-all flex justify-center items-center shadow-lg`}
                  >
                    <HiOutlinePlus />
                  </button>
                )}
              </div>
            ) : (
              <div
                className={`${
                  !isDark ? "text-stone-200" : "text-slate-600"
                } transition-all duration-150 `}
              >
                ლინკები არ არის ხელმისაწვდომი
              </div>
            )}
          </div>
        </div>
        <AddExperienceModal
          isOpenUserInfo={isOpenUserInfo}
          setIsOpenUserInfo={setIsOpenUserInfo}
        />
        <AddLocationModal
          isOpenLocation={isOpenLocation}
          setIsOpenLocation={setIsOpenLocation}
        />
        <AddLinksModal setIsOpen={setIsOpen} isOpen={isOpen} />
        <div className="rounded-lg border border-gray-400 py-2 px-8 flex flex-col justify-center items-start gap-4 ">
          {user.id === accountId && (
            <div className="flex justify-center items-center w-full">
              <Button
                onClick={() => setIsOpenUserInfo(true)}
                className={`flex justify-center items-center ${
                  !isDark && "text-stone-200"
                }`}
                variant="ghost"
                color="primary"
                size="sm"
              >
                დაამატე გამოცდილება
              </Button>
            </div>
          )}
          <div
            className={`${
              !isDark ? "text-stone-200" : "text-blue-600"
            } flex flex-col items-start w-full transition-all duration-150`}
          >
            <p className={` font-semibold`}>სამუშაო გამოცდილება</p>
            <div className="w-full border-t border-gray-400"></div>
            <span className="mt-2 text-sm">
              {experience ? experience : "I have no experience"}
            </span>
          </div>
          <div
            className={`${
              !isDark ? "text-stone-200" : "text-blue-600"
            } flex flex-col items-start w-full transition-all duration-150`}
          >
            <p className={` font-semibold`}>განათლება</p>
            <div className="w-full border-t border-gray-400"></div>
            <span className="mt-2 text-sm">
              {education ? education : "None"}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center py-6">
        {accountId === user.id ? (
          ""
        ) : (
          <Button
            className={`text-center m-auto ${
              !isDark && "text-stone-200"
            } transition-all duration-150`}
            color="primary"
            variant="ghost"
            size="md"
            onClick={() => handelHireUser(user)}
          >
            ამიყვანე სამსახურში
          </Button>
        )}
      </div>
    </div>
  );
}
