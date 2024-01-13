import { Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";

export default function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorted = ["default", "date", "age", "skills"];

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <div className="w-full flex items-center">
      <Select
        labelPlacement={"outside-left"}
        placeholder="Sort By"
        variant="faded"
        color="primary"
        size="lg"
        aria-label="Sort By"
        onChange={(e) => handleSort(e)}
      >
        {sorted.map((value) => (
          <SelectItem key={value} value={value}>
            {value.slice(0, 1).toUpperCase() + value.slice(1)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
