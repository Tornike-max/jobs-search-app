import { Button, Chip, Select, SelectItem } from "@nextui-org/react";
import { photoVideoSkills } from "../../constants";
import { useState } from "react";
import { useAddSkill } from "../../hooks/authHooks/useAddSkill";
import { useUserContext } from "../../context/useUserContext";
import SmallSpinner from "../../ui/SmallSpinner";
import { useDarkMode } from "../../context/useDarkMode";

export default function UserSkills({
  skills,
  accountId,
}: {
  skills: string[];
  accountId: string;
}) {
  const { user } = useUserContext();
  const { mutate, isPending } = useAddSkill();
  const [skillValue, setSkillValue] = useState<string>("");
  const { isDark } = useDarkMode();

  const handleAddSkill = () => {
    if (skillValue) {
      mutate({ skill: skillValue, userId: user.id });
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {/* Your UI components for layout */}
      <div
        className={`w-full flex justify-start text-2xl font-semibold ${
          !isDark ? "text-stone-200" : "text-indigo-600"
        }  pb-2`}
      >
        <h1>უნარები</h1>
      </div>
      {/* Rest of your UI components */}
      <div className="w-full border-[0.5px] border-stone-600 mb-2"></div>

      {user.id === accountId && (
        <>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
              label="აირჩიე შენი უნარები"
              variant="underlined"
              value={skillValue}
              onChange={(e) => setSkillValue(e.target.value)}
              className={`${!isDark ? "text-stone-200" : ""} w-full`}
            >
              {photoVideoSkills.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-full flex justify-end items-center">
            <Button
              size="sm"
              variant="ghost"
              color="primary"
              onClick={handleAddSkill}
              className={`${!isDark && "text-stone-200"}`}
            >
              {isPending ? <SmallSpinner /> : "დაამატე უნარი"}
            </Button>
          </div>
        </>
      )}

      {/* Display selected skills */}
      <div className="py-2 px-3">
        {skills.length !== 0 ? (
          skills.map((skill) => (
            <Chip
              key={skill}
              className={`m-[2px] ${!isDark && "text-stone-200"}`}
              size="md"
              color="primary"
            >
              {skill}
            </Chip>
          ))
        ) : (
          <p
            className={`text-sm md:text-base ${
              !isDark ? "text-stone-200" : "text-stone-800"
            }  font-normal`}
          >
            მომხმარებლის უნარები არ მოიძებნა
          </p>
        )}
      </div>
    </div>
  );
}
