import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/useDarkMode";

export default function SortByAge() {
  const { isDark } = useDarkMode();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value || "";
    searchParams.set("sortByAge", selectedValue);
    setSearchParams(searchParams);
  };

  if (!searchParams) {
    return null;
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          {" "}
          <span className={`${!isDark && "text-stone-200"}`}>ასაკი</span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChange}
          autoWidth
          label="Age"
          value={searchParams.get("sortByAge") || ""} // Set value from URL param
        >
          <MenuItem value="">
            <em>გაუქმება</em>
          </MenuItem>
          <MenuItem value={"asc"}>ზრდადობით</MenuItem>
          <MenuItem value={"desc"}>კლებადობით</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
