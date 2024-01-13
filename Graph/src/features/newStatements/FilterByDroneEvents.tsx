import { Select, SelectItem } from "@nextui-org/react";
import { dronePhotographyStyles } from "../../constants";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function FilterByDroneEvents({
  getParams,
  styleParams,
}: {
  getParams: string;
  styleParams: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const getFilterParams = searchParams.get("filter") || "";

  useEffect(() => {
    searchParams.delete(styleParams);
    setSearchParams(searchParams);
  }, [getFilterParams]);

  function handleChange(value: string) {
    const updatedSearchParams = new URLSearchParams(searchParams);

    if (getParams === getFilterParams) {
      updatedSearchParams.set("shootStyleDrone", value);
    } else {
      updatedSearchParams.delete(styleParams);
    }

    setSearchParams(updatedSearchParams);
  }

  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select
          label="აირჩიე გადაღების სტილი"
          variant="faded"
          color="primary"
          size="lg"
          onChange={(e) => handleChange(e.target.value)}
        >
          {dronePhotographyStyles.map((drone) => (
            <SelectItem key={drone} value={drone}>
              {drone}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
}
