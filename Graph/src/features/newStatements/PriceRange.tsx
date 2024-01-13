import { Button, Slider } from "@nextui-org/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/useDarkMode";
import { formatCurrency } from "../../ui/formatCurrency";

export default function PriceRange() {
  const { isDark } = useDarkMode();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceValue, setPriceValue] = useState<number>(100); // State to manage price value

  function handleFilterByPrice(value: number | number[]) {
    // Update the local state
    setPriceValue(value as number);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Update URL parameter with the new price value
    searchParams.set("byPrice", String(priceValue));
    setSearchParams(searchParams);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-end gap-2 flex-col justify-center"
    >
      <span
        className={`text-start w-full text-sm ${!isDark && "text-stone-100"}`}
      >
        ფასის მიხედვით- {formatCurrency(priceValue)}
      </span>
      <Slider
        step={50}
        minValue={0}
        size="lg"
        maxValue={5000}
        color="primary"
        value={priceValue}
        formatOptions={{ style: "currency", currency: "GEL" }}
        className={`w-full ${isDark && " text-stone-200"}`}
        onChange={(value) => handleFilterByPrice(value)}
        aria-label="Price Range Slider"
      />
      <Button type="submit" size="md">
        გაფილტვრა
      </Button>
    </form>
  );
}
