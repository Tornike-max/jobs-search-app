import { Button } from "@nextui-org/button";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/useDarkMode";

export default function FilterByRole() {
  const { isDark } = useDarkMode();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilterValue = searchParams.get("filter") || "all";
  function handleFilter(value: string) {
    searchParams.set("filter", value);
    setSearchParams(searchParams);
  }
  return (
    <div className="w-full flex items-center gap-4">
      <div className="flex w-full flex-col justify-center items-center gap-2">
        <div className="flex w-full items-center gap-1">
          <Button
            onClick={() => handleFilter("Photographer")}
            type="button"
            variant="ghost"
            size="lg"
            color="primary"
            className={`${!isDark && "text-stone-200"} ${
              currentFilterValue === "Photographer" &&
              "bg-primary-500 text-stone-200"
            }`}
          >
            ფოტოგრაფები
          </Button>
          <Button
            onClick={() => handleFilter("Videographer")}
            type="button"
            variant="ghost"
            size="lg"
            color="primary"
            className={`${!isDark && "text-stone-200"} ${
              currentFilterValue === "Videographer" &&
              "bg-primary-500 text-stone-200"
            }`}
          >
            ვიდეოგრაფები
          </Button>
          <Button
            onClick={() => handleFilter("VideoEditor")}
            type="button"
            variant="ghost"
            size="lg"
            color="primary"
            className={`${!isDark && "text-stone-200"} ${
              currentFilterValue === "VideoEditor" &&
              "bg-primary-500 text-stone-200"
            }`}
          >
            ვიდეო ედიტორები
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => handleFilter("DronePilot")}
            type="button"
            variant="ghost"
            size="lg"
            color="primary"
            className={`${!isDark && "text-stone-200"} ${
              currentFilterValue === "DronePilot" &&
              "bg-primary-500 text-stone-200"
            }`}
          >
            დრონის პილოტები
          </Button>
          <Button
            onClick={() => handleFilter("Studio")}
            type="button"
            variant="ghost"
            size="lg"
            color="primary"
            className={`${!isDark && "text-stone-200"} ${
              currentFilterValue === "Studio" && "bg-primary-500 text-stone-200"
            }`}
          >
            სტუდიო
          </Button>
          <Button
            onClick={() => handleFilter("all")}
            type="button"
            variant="ghost"
            size="lg"
            color="primary"
            className={`${!isDark && "text-stone-200"} ${
              currentFilterValue === "all" && "bg-primary-500 text-stone-200"
            }`}
          >
            ყველა
          </Button>
        </div>
      </div>
    </div>
  );
}
