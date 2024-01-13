import { Select } from "antd";
import { useSearchParams } from "react-router-dom";
import { filterByCategory } from "../../constants";

export default function FilterByCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedItems = searchParams.get("category");

  const filteredOptions = filterByCategory
    .filter((o) => !selectedItems?.includes(o))
    .map((item) => ({ value: item, label: item }));

  function handleSelectPlace(value: string) {
    searchParams.set("category", value || "ყველა");
    setSearchParams(searchParams);
  }

  return (
    <Select
      showSearch
      placeholder="კატეგორია"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      onChange={handleSelectPlace}
      options={filteredOptions}
      className="w-56"
    />
  );
}
