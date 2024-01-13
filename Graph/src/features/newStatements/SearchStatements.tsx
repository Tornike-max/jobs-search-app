import { Input } from "@nextui-org/react";
import { GrSearch } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";

export default function SearchStatements() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce<string>(query, 500);

  useEffect(() => {
    searchParams.set("search", debouncedValue);
    setSearchParams(searchParams);
  }, [debouncedValue, searchParams, setSearchParams]);

  return (
    <form className="w-full justify-center items-center">
      <Input
        type="search"
        placeholder="მოძებნე სასურველი პიროვნება"
        labelPlacement="outside"
        variant="faded"
        size="lg"
        onChange={(e) => setQuery(e.target.value)}
        startContent={
          <GrSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
    </form>
  );
}
