import { Button, Slider } from "@nextui-org/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/useDarkMode";
import { formatCurrency } from "../../ui/formatCurrency";

export default function FilterBySalary() {
  const { isDark } = useDarkMode();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<number>(100);

  function handleFilterBySalary(value: number | number[]) {
    setValue(value as number);
  }

  function handleSalary(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    searchParams.set("filterJobSalary", String(value));
    setSearchParams(searchParams);
  }

  return (
    <form
      onSubmit={handleSalary}
      className="w-full flex items-end gap-2 flex-col justify-center"
    >
      {/* Add a label for the Slider */}
      <label
        htmlFor="salarySlider"
        className={`text-start w-full text-sm ${!isDark && "text-stone-100"}`}
      >
        სასურველი ხელფასი- {formatCurrency(value)}
      </label>
      <Slider
        id="salarySlider"
        step={50}
        minValue={0}
        size="lg"
        maxValue={5000}
        color="primary"
        aria-label="Salary Slider"
        value={value}
        formatOptions={{ style: "currency", currency: "GEL" }}
        className={`w-full ${isDark && " text-stone-200"}`}
        onChange={(value) => handleFilterBySalary(value)}
      />
      <Button
        className={`${!isDark && "text-stone-200"}`}
        size="sm"
        type="submit"
        variant="ghost"
        color="primary"
      >
        გაფილტვრა
      </Button>
    </form>
  );
}
