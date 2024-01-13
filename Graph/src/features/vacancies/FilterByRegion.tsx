import { Select } from "antd";
import { useSearchParams } from "react-router-dom";
import { georgianRegions } from "../../constants";

export default function FilterByRegion() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItems = searchParams.get("location");

  const filteredOptions = georgianRegions
    .filter((o) => !selectedItems?.includes(o))
    .map((item) => ({ value: item, label: item }));

  function handleSelectPlace(value: string) {
    const locationValue = value;
    searchParams.set("location", locationValue || "ყველა");
    setSearchParams(searchParams);
  }

  return (
    <Select
      showSearch
      placeholder="ლოკაცია"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      onChange={handleSelectPlace}
      options={filteredOptions}
      className="w-56"
    />
  );
}
