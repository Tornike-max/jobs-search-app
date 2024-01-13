import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";

export default function FilterUserLevel() {
  const [searchParams, setSearchParamse] = useSearchParams();
  const skillLevelArr = ["დამწყები", "გამოცდილი", "პროფესიონალი"];

  function handleFilterLevel(e: React.ChangeEvent<HTMLSelectElement>) {
    const status =
      e.target.value === "დამწყები"
        ? "beginner"
        : e.target.value === "გამოცდილი"
        ? "experienced"
        : e.target.value === "პროფესიონალი"
        ? "professional"
        : "";

    searchParams.set("skillLevel", status);
    setSearchParamse(searchParams);
  }
  return (
    <div className="w-full flex items-center">
      <Select
        labelPlacement={"outside-left"}
        placeholder="გამოცდილების დონე"
        variant="faded"
        color="primary"
        size="lg"
        aria-label="მაგოცდილების დონე"
        onChange={(e) => handleFilterLevel(e)}
      >
        {skillLevelArr.map((value) => (
          <SelectItem key={value} value={value}>
            {value.slice(0, 1).toUpperCase() + value.slice(1)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
