import { useSearchParams } from "react-router-dom";
import FilterByDroneEvents from "./FilterByDroneEvents";
import FilterByPhotoEvents from "./FilterByPhotoEvents";
import FilterByRole from "./FilterByRole";
import FilterByVideoEditorEvents from "./FilterByVideoEditorEvents";
import FilterByVideoEvents from "./FilterByVideoEvents";
import FilterGender from "./FilterGender";
import FilterUserLevel from "./FilterUserLevel";
import PriceRange from "./PriceRange";
import SearchStatements from "./SearchStatements";
import SortByAge from "./SortByAge";
import SortByPrice from "./SortByPrice";

export default function FilterUserStatements() {
  const [searchParams] = useSearchParams();
  const getParams = searchParams.get("filter") || "";
  const styleParams =
    searchParams.get("shootStyleDrone") ||
    searchParams.get("shootStylePhoto") ||
    searchParams.get("shootStyleEditor") ||
    searchParams.get("shootStyleVideo");
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex w-full justify-center items-center flex-col gap-2 px-36">
        <div className="flex items-center justify-center gap-2 w-full">
          <SearchStatements />
          <FilterUserLevel />
        </div>
        <div className="flex items-center justify-between w-full">
          <PriceRange />
        </div>
        {getParams === "Photographer" && (
          <div className="flex items-center justify-between w-full">
            <FilterByPhotoEvents
              getParams={getParams}
              styleParams={styleParams || ""}
            />
          </div>
        )}
        {getParams === "Videographer" && (
          <div className="flex items-center justify-between w-full">
            <FilterByVideoEvents
              getParams={getParams}
              styleParams={styleParams || ""}
            />
          </div>
        )}

        {getParams === "DronePilot" && (
          <div className="flex items-center justify-between w-full">
            <FilterByDroneEvents
              getParams={getParams}
              styleParams={styleParams || ""}
            />
          </div>
        )}

        {getParams === "VideoEditor" && (
          <div className="flex items-center justify-between w-full">
            <FilterByVideoEditorEvents
              getParams={getParams}
              styleParams={styleParams || ""}
            />
          </div>
        )}
        <div className="flex items-center justify-center gap-2 w-full">
          <SortByAge />
          <SortByPrice />
          <FilterGender />
        </div>

        <div className="py-4 flex justify-between items-center ">
          <FilterByRole />
        </div>
      </div>
    </div>
  );
}
