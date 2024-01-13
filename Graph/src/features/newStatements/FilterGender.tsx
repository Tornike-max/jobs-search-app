import {
  FormControl,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/useDarkMode";

export default function FilterGender() {
  const { isDark } = useDarkMode();
  const [isFemaleChecked, setIsFemaleSelected] = useState(false);
  const [isMaleChecked, setIsMaleSelected] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const getGender = searchParams.get("gender") || "";

  useEffect(() => {
    if (isFemaleChecked) {
      setIsMaleSelected(false);
    }
    if (isMaleChecked) {
      setIsFemaleSelected(false);
    }
  }, [isFemaleChecked, isMaleChecked]);

  function handleGender(event: SelectChangeEvent) {
    if (event.target.value === "all") {
      searchParams.delete("gender");
      setSearchParams(searchParams);
      setIsFemaleSelected(false);
      setIsMaleSelected(false);
    }
    if (event.target.value === "Female") {
      searchParams.set("gender", event.target.value);
      setSearchParams(searchParams);
      setIsFemaleSelected(true);
      setIsMaleSelected(false);
    }
    if (event.target.value === "Male") {
      searchParams.set("gender", event.target.value);
      setSearchParams(searchParams);
      setIsMaleSelected(true);
      setIsFemaleSelected(false);
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-helper-label">
          <span className={`${!isDark && "text-stone-200"}`}>გენდერი</span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          onChange={(event) => handleGender(event)}
          value={getGender}
        >
          <MenuItem value="all">
            <em>ორიცე</em>
          </MenuItem>
          <MenuItem value={"Female"}>ქალი</MenuItem>
          <MenuItem value={"Male"}>კაცი</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
