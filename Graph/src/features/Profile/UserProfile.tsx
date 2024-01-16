import { useNavigate, useParams } from "react-router-dom";
import { useGetUserFromDB } from "../../hooks/authHooks/useGetUserFromDB";
import Loader from "../../ui/Loader";
import { UserHeader } from "./UserHeader";
import UserInfo from "./UserInfo";
import UserSkills from "./UserSkills";
import AboutMe from "./AboutMe";
// import PortfolioLinks from "./PortfolioLinks";
import UserPortfolio from "./UserPortfolio";
import { Button } from "@nextui-org/button";
import { useUserContext } from "../../context/useUserContext";
import ProfileSpringModal from "../../ui/ProfileSpringModal";
import { useDisclosure } from "@nextui-org/react";
import AddYourShootingStyles from "./AddYourShootingStyles";
import { useGetSingleCompany } from "../../hooks/companiesHook/useGetSingleCompany";
import { useDarkMode } from "../../context/useDarkMode";

export function UserProfile() {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const { user, company } = useUserContext();
  const { accountId } = useParams<{ accountId: string }>();

  const { userData, isUserPending } = useGetUserFromDB(accountId || "");
  const { data, isPending } = useGetSingleCompany(company.id || "");

  if (isUserPending || isPending) {
    return <Loader color="primary" />;
  }

  return (
    <div className="max-w-[1920px] w-full">
      {/* Header */}
      <UserHeader
        accountId={accountId || data?.accountId}
        name={userData?.name || data?.name}
        email={userData?.email || data?.email}
        status={userData?.status || "კომპანია"}
        imageUrl={userData?.imageUrl || data?.imageUrl}
        onOpen={onOpen}
      />

      {/* User Information */}
      <div className="mt-4">
        <UserInfo
          accountId={userData?.$id || ""}
          linkedinUrl={userData?.linkedinUrl || ""}
          instagramUrl={userData?.instagramUrl || ""}
          experience={userData?.experience || ""}
          education={userData?.education || ""}
          location={userData?.location || ""}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        <div
          className={`custom-card ${
            !isDark ? "bg-primary-800 shadow-xl" : "bg-stone-100"
          } text-lg font-bold text-center py-4 px-5 rounded-lg row-span-2 overflow-y-auto max-h-[300px] transition-all duration-150`}
        >
          <UserSkills
            accountId={userData?.$id || data?.$id || ""}
            skills={userData?.skills || []}
          />
        </div>
        <div
          className={`custom-card ${
            !isDark ? "bg-primary-800 shadow-xl text-stone-100" : "bg-stone-100"
          } transition-all duration-150 text-center py-4 px-5 rounded-lg row-span-2 overflow-y-auto max-h-[300px]`}
        >
          <AddYourShootingStyles
            events={userData?.provided_events || []}
            accountId={userData?.$id || data?.$id || ""}
          />
        </div>
        <div
          className={`custom-card text-lg ${
            !isDark ? "bg-primary-800 shadow-xl text-stone-100" : "bg-stone-100"
          } transition-all duration-150 text-center py-4 px-5 rounded-lg row-span-2 overflow-y-auto max-h-[300px]`}
        >
          <AboutMe
            accountId={userData?.$id || data?.$id || ""}
            bio={userData?.bio || ""}
          />
        </div>
      </div>
      <div
        className={`shadow-lg  text-center ${
          !isDark ? "bg-primary-800 shadow-xl" : "bg-stone-100"
        }  py-4 px-5 rounded-lg col-span-3 transition-all duration-150`}
      >
        {user.id === userData?.$id && (
          <div className="flex justify-center items-center w-full pb-2">
            <Button
              onClick={() => navigate("/createPortfolio")}
              variant="ghost"
              color="primary"
              className={`${!isDark && "text-stone-200"}`}
            >
              დაამატე ახალი სურათი
            </Button>
          </div>
        )}
        <UserPortfolio
          portfolio={userData?.portfolio}
          id={userData?.accountId}
        />
      </div>

      <ProfileSpringModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        imgUrl={userData?.imageUrl || data?.imageUrl}
      />
    </div>
  );
}
