import { Select, SelectItem } from "@nextui-org/react";
import { editingStyles } from "../../constants";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function FilterByVideoEditorEvents({
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
      updatedSearchParams.set("shootStyleVideo", value);
    } else {
      updatedSearchParams.delete(styleParams);
    }

    setSearchParams(updatedSearchParams);
  }
  return (
    <>
      <div className="flex w-full flex-wrap md:sflex-nowrap gap-4">
        <Select
          label="აირჩიე გადაღების სტილი"
          variant="faded"
          color="primary"
          size="lg"
          onChange={(e) => handleChange(e.target.value)}
        >
          {editingStyles.map((video) => (
            <SelectItem key={video} value={video}>
              {video}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
}
