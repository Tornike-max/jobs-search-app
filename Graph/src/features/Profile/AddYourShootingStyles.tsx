import { Button } from "@nextui-org/button";
import { Select, SelectItem, Chip } from "@nextui-org/react";
import { useState } from "react";
import { allEventStyles } from "../../constants";
import { useUserContext } from "../../context/useUserContext";
import { useAddNewShootingEvent } from "../../hooks/authHooks/useAddNewShootingEvent";
import SmallSpinner from "../../ui/SmallSpinner";
import { Models } from "appwrite";
import { useDarkMode } from "../../context/useDarkMode";

export default function AddYourShootingStyles({
  events,
  accountId,
}: {
  events: Models.Document;
  accountId: string;
}) {
  const { user } = useUserContext();
  const { addEvent, isAddingEvent } = useAddNewShootingEvent();
  const [eventValue, setEventValue] = useState<string>("");
  const { isDark } = useDarkMode();

  const handleAddSkill = () => {
    if (eventValue) {
      addEvent({ event: eventValue, userId: user.id });
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
        <h1>აირჩიე შენი სტილი</h1>
      </div>
      {/* Rest of your UI components */}
      <div className="w-full border-[0.5px] border-stone-600 mb-2"></div>

      {user.accountId === accountId && (
        <>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
              label="აირჩიე სტილი"
              variant="underlined"
              className="w-full"
              value={eventValue}
              onChange={(e) => setEventValue(e.target.value)}
            >
              {allEventStyles.map((event) => (
                <SelectItem key={event} value={event}>
                  {event}
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
              disabled={isAddingEvent}
            >
              {isAddingEvent ? <SmallSpinner /> : "დაამატე სტილი"}
            </Button>
          </div>
        </>
      )}

      {/* Display selected skills */}
      <div className="py-2 px-3">
        {events.length !== 0 ? (
          events.map((event: string) => (
            <Chip
              className={`${!isDark && "text-stone-200"} m-[2px]`}
              key={event}
              size="sm"
              color="primary"
            >
              {event}
            </Chip>
          ))
        ) : (
          <p
            className={`text-sm md:text-base ${
              !isDark ? "text-stone-200" : "text-stone-800"
            }  font-normal`}
          >
            There are no events available
          </p>
        )}
      </div>
    </div>
  );
}
