import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/useUserContext";
import { useGetUserFromDB } from "../../hooks/authHooks/useGetUserFromDB";
import Loader from "../../ui/Loader";
import AddYourStatus from "./AddYourStatus";
import ChangePassword from "./ChangePassword";
import EditUserInfo from "./EditUserInfo";
import { Button } from "@nextui-org/button";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useDarkMode } from "../../context/useDarkMode";

export default function Profile() {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const userFromDB = useGetUserFromDB(user?.accountId);
  const userData = userFromDB?.userData;
  const isUserPending = userFromDB?.isUserPending;

  if (isUserPending) return <Loader color="primary" />;
  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center flex-col px-20">
      <div className="flex justify-start w-full">
        <Button
          onClick={() => navigate(-1)}
          type="button"
          variant="ghost"
          color="primary"
          className={`flex items-center ${!isDark ? "text-stone-200" : ""}`}
        >
          <HiOutlineArrowLeft />
          <span>უკან დაბრუნება</span>
        </Button>
      </div>
      <AddYourStatus
        userData={userData}
        $id={""}
        $collectionId={""}
        $databaseId={""}
        $createdAt={""}
        $updatedAt={""}
        $permissions={[]}
      />
      <EditUserInfo />
      <ChangePassword />
    </div>
  );
}
