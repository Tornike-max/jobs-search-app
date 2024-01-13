import { Button } from "@nextui-org/button";

import { useState } from "react";
import AddBioModal from "../../ui/AddBioModal";
import { useUserContext } from "../../context/useUserContext";
import { useDarkMode } from "../../context/useDarkMode";

export default function AboutMe({
  bio,
  accountId,
}: {
  bio: string;
  accountId: string;
}) {
  const { user } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useDarkMode();
  return (
    <div className="flex flex-wrap gap-1">
      <div
        className={`w-full flex justify-start text-2xl font-semibold ${
          !isDark ? "text-stone-200" : "text-indigo-600"
        }  pb-2`}
      >
        <h1>ჩემს შესახებ</h1>
      </div>
      <div className="w-full border-[0.5px] border-stone-600 mb-2"></div>
      <span className="text-sm font-serif text-start">
        {bio ? bio : "აღწერა არ არის ხელმისაწვდომი"}
      </span>
      {user.id === accountId && (
        <div className="w-full flex justify-end items-center">
          <Button
            onClick={() => setIsOpen(true)}
            variant="ghost"
            color="primary"
            size="sm"
            className={`${!isDark ? "text-stone-200" : ""}`}
          >
            განაახლე არწერილობა
          </Button>
        </div>
      )}

      <AddBioModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}
