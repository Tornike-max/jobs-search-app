import { Button } from "@nextui-org/button";
import { useRef, ChangeEvent } from "react";
import { useChangeProfileImage } from "../../hooks/authHooks/useChangeProfileImage";
import { useUserContext } from "../../context/useUserContext";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@nextui-org/react";
import { useDarkMode } from "../../context/useDarkMode";
import { HiOutlineArrowLeft } from "react-icons/hi2";

export function UserHeader({
  name,
  email,
  imageUrl,
  onOpen,
  accountId,
  status,
}: {
  accountId: string;
  name: string;
  email: string;
  status: string;
  imageUrl: string;
  onOpen: () => void;
}) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { isDark } = useDarkMode();
  const { mutate: changeProfile, isPending: changing } =
    useChangeProfileImage();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef?.current?.click?.();
  };

  // Function to handle file selection
  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const newData = {
        userId: accountId,
        file,
      };
      changeProfile(newData);
    }
  };
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl ${
        !isDark ? "bg-primary-800 shadow-xl" : "bg-stone-100"
      } transition-all duration-150 w-full pb-4`}
    >
      <div className="relative w-full h-32 rounded-t-2xl overflow-hidden mb-6">
        <div
          className={`bg-gradient-to-r ${
            !isDark
              ? "from-primary-600 to-blue-700"
              : "from-purple-500 to-blue-500"
          } transition-all duration-150 w-full h-full`}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            color="default"
            className="ml-10 mt-4 text-stone-200 hover:text-stone-800"
          >
            <HiOutlineArrowLeft />
            <span> Go Back</span>
          </Button>
        </div>
      </div>
      <div className="flex items-center flex-col md:flex-row">
        <div className="rounded-full overflow-hidden mr-4">
          <Avatar
            src={imageUrl}
            size="lg"
            onClick={() => onOpen()}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span
            className={`${
              !isDark ? "text-stone-200" : "text-stone-800"
            } font-bold text-lg`}
          >
            {name}
          </span>
          <span
            className={`text-base ${
              !isDark ? "text-stone-200" : "text-stone-600"
            } transition-all duration-150`}
          >
            {email}
          </span>
          <span
            className={`text-base ${
              !isDark ? "text-stone-200" : "text-stone-600"
            } transition-all duration-150`}
          >
            {status ? status : "Client"}
          </span>
        </div>
      </div>
      {user.accountId === accountId && (
        <div className="w-full flex justify-center items-center py-2 gap-1">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(event) => handleFileSelected(event)}
          />
          <Button
            disabled={changing}
            onClick={handleButtonClick}
            variant="ghost"
            color="primary"
            className={`${!isDark && "text-stone-200"}`}
          >
            შეცვალე პროფილის სურათი
          </Button>
          <Button
            disabled={changing}
            onClick={() => navigate(`/profile/${user.accountId}`)}
            variant="ghost"
            color="primary"
            className={`${!isDark && "text-stone-200"}`}
          >
            შეცვალე ინფორმაცია
          </Button>
        </div>
      )}
    </div>
  );
}
