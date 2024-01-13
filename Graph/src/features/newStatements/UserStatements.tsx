import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFilter } from "../../hooks/filterHooks/useFilter";
import Loader from "../../ui/Loader";
import { Button } from "@nextui-org/button";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { GiFemale, GiMale } from "react-icons/gi";
import { useDarkMode } from "../../context/useDarkMode";

export default function UserStatements() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const filterValue = searchParams.get("filter") || "all";
  const searchedValue = searchParams.get("search") || "";
  const skillLevel = searchParams.get("skillLevel") || "";
  const getFilterPrice = searchParams.get("byPrice") || "";
  const getGender = searchParams.get("gender") || "";
  const getSortedAge = searchParams.get("sortByAge") || "";
  const getSortedPrice = searchParams.get("sortByPrice") || "";
  console.log(getSortedPrice);
  const shootStyle =
    searchParams.get("shootStylePhoto") ||
    searchParams.get("shootStyleDrone") ||
    searchParams.get("shootStyleEditor") ||
    searchParams.get("shootStyleVideo") ||
    "";
  const { isDark } = useDarkMode();
  const { filtered, isFiltering } = useFilter(
    filterValue,
    Number(currentPage),
    skillLevel,
    searchedValue,
    getFilterPrice,
    getGender,
    shootStyle,
    getSortedAge,
    getSortedPrice
  );

  if (isFiltering) return <Loader color="primary" />;
  function nextPageFunc() {
    const nextPage = Number(currentPage) + 1;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", String(nextPage));
    setSearchParams(newSearchParams.toString());
  }

  function prevPageFunc() {
    const prevPage = Number(currentPage) - 1;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", String(prevPage));
    setSearchParams(newSearchParams.toString());
  }

  console.log(filtered);
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto  w-full">
        {filtered && filtered?.length > 0 ? (
          filtered?.map((document) => (
            <div
              key={document.$id}
              className={`w-full max-w-[1920px] ${
                !isDark ? "bg-primary-900" : "bg-white"
              } border border-gray-200 rounded-lg shadow transition-all duration-150`}
            >
              <Link to={`/account/${document?.accountId}`}>
                <img
                  className="rounded-t-lg h-96 w-full"
                  src={document?.imageUrl}
                  alt="user image"
                />
              </Link>
              <div className="px-5 pb-5">
                <div
                  className={`flex items-center gap-3 justify-between ${
                    !isDark ? "text-stone-100" : "text-primary-600"
                  } transition-all duration-150 py-2`}
                >
                  <div className="text-lg font-semibold flex items-center gap-2 tracking-tight ">
                    <span>{document?.name}</span>
                    <p className="text-base">
                      {document.gender === "Male" ? <GiFemale /> : <GiMale />}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p>{document.age} წ</p>
                  </div>
                </div>

                <div
                  className={`flex justify-start items-center gap-2 ${
                    !isDark ? "text-stone-100" : "text-primary-600"
                  } transition-all duration-150 `}
                >
                  <span className="text-sm font-medium ">
                    {document?.skillLevel.slice(0, 1).toUpperCase() +
                      document?.skillLevel.slice(1)}
                  </span>
                  <span className="text-sm font-medium">{document.status}</span>
                </div>
                <div
                  className={`${
                    !isDark ? "text-stone-100" : "text-primary-600"
                  } font-medium transition-all duration-150 text-sm`}
                >
                  <span>{document.available ? "მცალია" : "არ მცალია"}</span>
                </div>
                <div
                  className={`flex items-center justify-between ${
                    !isDark ? "text-stone-100" : "text-primary-600"
                  } transition-all duration-150`}
                >
                  <span className="text-2xl font-bold ">
                    {document?.price}₾
                  </span>
                  <Button
                    onClick={() => navigate(`/account/${document?.accountId}`)}
                    variant="ghost"
                    color="primary"
                    className={`${
                      !isDark && "text-stone-100 "
                    } transition-all duration-150`}
                  >
                    ვრცლად
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-4 px-10 text-primary-600 text-center">
            There is no data available
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-end gap-4">
        <Button
          disabled={Number(currentPage) === 1}
          onClick={prevPageFunc}
          type="button"
          variant="ghost"
          color="primary"
          className={`${
            !isDark && "text-stone-100 "
          } transition-all duration-150`}
        >
          <HiOutlineArrowLeft />
          <span>Previouse</span>
        </Button>
        <span
          className={`${
            !isDark && "text-stone-100 "
          } transition-all duration-150`}
        >
          {currentPage}
        </span>
        <Button
          onClick={nextPageFunc}
          type="button"
          variant="ghost"
          color="primary"
          className={`${
            !isDark && "text-stone-100 "
          } transition-all duration-150`}
        >
          <span>Next</span>
          <HiOutlineArrowRight />
        </Button>
      </div>
    </div>
  );
}
