import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";

export default function SearchVacancies() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce<string>(query, 500);

  useEffect(() => {
    searchParams.set("searchJob", debouncedValue);
    setSearchParams(searchParams);
  }, [debouncedValue, searchParams, setSearchParams]);

  return (
    <form>
      <Input
        type="search"
        placeholder="ძიება"
        labelPlacement="outside"
        onChange={(e) => setQuery(e.target.value)}
        size="sm"
        endContent={
          <GrSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
    </form>
  );
}
