import { useNavigate, useParams } from "react-router-dom";
import { useGetUserFromDB } from "../../hooks/authHooks/useGetUserFromDB";
import Loader from "../../ui/Loader";
import {
  Accordion,
  AccordionItem,
  Button,
  Chip,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { HiOutlinePhone } from "react-icons/hi2";
import { useUserContext } from "../../context/useUserContext";

import { MdOutlineMail } from "react-icons/md";
import { GrInstagram, GrLinkedin } from "react-icons/gr";
import EmployeSuggestModal from "./EmployeSuggestModal";
import { useDarkMode } from "../../context/useDarkMode";

export default function HireUser() {
  const { isDark } = useDarkMode();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const { accountId } = useParams();
  const { userData, isUserPending } = useGetUserFromDB(accountId || "");
  const { user } = useUserContext();

  if (isUserPending) return <Loader color="primary" />;

  return (
    <div className="max-w-[1920px] w-full px-20 sm:py-4 md:py-8 lg:py-12 flex justify-center items-center flex-col gap-4">
      <h1
        className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${
          !isDark ? "text-stone-200" : "text-primary-500"
        }  w-full text-center`}
      >
        სამსახურში აყვანა
      </h1>
      <div className="border-[0.5px] border-stone-400 py-2 px-4 rounded-md w-full">
        <Accordion defaultExpandedKeys={["1"]}>
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            subtitle="დააჭირე ჩამოსაშლელად"
            title="საკონტაქტო ინფორმაცია"
          >
            <div
              className={`flex flex-col gap-2 items-start justify-center ${
                !isDark ? "text-stone-200" : "text-primary-500"
              } text-sm sm:text-base`}
            >
              <div className="flex items-center gap-1 ">
                <HiOutlinePhone className="text-base sm:text-lg" />
                <p>
                  ტელეფონის ნომერი:{" "}
                  {user?.phone ? user.phone : "არ არის ხელმისაწვდომი"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineMail className="text-base sm:text-lg" />
                <p>
                  იმეილი:{" "}
                  {userData?.email ? userData.email : "არ არის ხელმისაწვდომი"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <GrLinkedin className="text-base sm:text-lg" />
                <p>
                  Linkedin:{" "}
                  {userData?.linkedinUrl ? (
                    <Link
                      isBlock
                      showAnchorIcon
                      href={userData?.linkedinUrl}
                      color="primary"
                    >
                      დააჭირე აქ
                    </Link>
                  ) : (
                    "არ არის ხელმისაწვდომი"
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <GrInstagram className="text-base sm:text-lg" />
                <p>
                  Instagram:{" "}
                  {userData?.instagramUrl ? (
                    <Link
                      isBlock
                      showAnchorIcon
                      href={userData.instagramUrl}
                      color="primary"
                    >
                      დააჭირე აქ
                    </Link>
                  ) : (
                    "არ არის ხელმისაწვდომი"
                  )}
                </p>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            subtitle={<span>დააჭირე ჩამოსაშლელად</span>}
            title="სქილების ნახვა"
          >
            <div
              className={`${
                !isDark ? "text-stone-200" : "text-primary-500"
              } flex flex-wrap gap-2`}
            >
              {userData?.skills.map((skill: string) => (
                <Chip variant="solid" color="primary">
                  {skill}
                </Chip>
              ))}
            </div>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            subtitle="დააჭირე ჩამოსაშლელად"
            title="ჩემს შესახებ"
          >
            <p className={`${!isDark ? "text-stone-200" : "text-primary-500"}`}>
              {userData?.bio ? userData.bio : "არ არის ხელმისაწვდომი"}
            </p>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full flex justify-end items-center gap-2">
        <Button
          className={`${!isDark && "text-stone-200 hover:text-stone-800"}`}
          onClick={() => navigate(-1)}
          variant="ghost"
          color="default"
        >
          უკან
        </Button>
        <Button
          className={`${!isDark && "text-stone-200"}`}
          onClick={() => onOpen()}
          variant="ghost"
          color="primary"
        >
          გააგზავნე იმეილი
        </Button>
      </div>
      <EmployeSuggestModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
