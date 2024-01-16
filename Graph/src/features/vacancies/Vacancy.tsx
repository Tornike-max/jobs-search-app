import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { formatDateString } from "../../ui/formatDateString";
import { calculateEndDate } from "../../ui/calculateEndDate";
import FilterByRegion from "./FilterByRegion";
import { useFilterByJobs } from "../../hooks/vacanciesHook/useFilterByJobs";
import Loader from "../../ui/Loader";
import FilterByCategory from "./FilterByCategory";
import SearchVacancies from "./SearchVacancies";
import { useDarkMode } from "../../context/useDarkMode";
import FilterBySalary from "./FilterBySalary";
import { formatCurrency } from "../../ui/formatCurrency";
import { Button } from "@nextui-org/button";
import { Key } from "react";
import SmallSpinner from "../../ui/SmallSpinner";

export default function Vacancy() {
  const navigate = useNavigate();
  const { isDark } = useDarkMode();
  const [searchParams] = useSearchParams();
  const getLocation = searchParams.get("location") || "ყველა";
  const getCategory = searchParams.get("category") || "ყველა";
  const searchValue = searchParams.get("searchJob") || "";
  const getSalary = searchParams.get("filterJobSalary") || "";
  const getSortSalary = searchParams.get("sortBySalary") || "";

  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFilterByJobs(
      getLocation,
      getCategory,
      searchValue,
      getSalary,
      getSortSalary
    );

  if (!data || isPending) return <Loader color="primary" />;

  const infiniteData = data.pages;
  // if (getSortSalary === "") sortedSalary = infiniteData?.map((d) => d);
  // if (getSortSalary === "asc")
  //   sortedSalary = infiniteData?.map((d) => d.map((documents) => documents));
  // if (getSortSalary === "desc")
  //   sortedSalary = infiniteData?.sort((a, b) => b.salary - a.salary);
  // console.log(infiniteData);

  return (
    <div className="max-w-[1920px] mx-auto py-6 px-10">
      <div className="w-full flex justify-center items-center flex-col pb-8 gap-4">
        <h1
          className={`text-base sm:text-2xl md:text-3xl font-semibold ${
            !isDark ? "text-stone-200" : "text-primary-600"
          }`}
        >
          ყველა განცხადება ერთ სივრცეში
        </h1>
        <Button
          onClick={() => navigate(`/publication`)}
          variant="ghost"
          className={`${
            !isDark && "text-stone-200"
          } w-40 sm:w-56 text-xs sm:text-base`}
          color="primary"
        >
          შექმენი განცხადება
        </Button>
      </div>
      <div className="w-full flex justify-end items-center mb-2">
        <div className="max-w-2xl w-full flex-col  flex justify-center items-center gap-4 m-auto">
          <div className="flex items-center flex-col sm:flex-row gap-4">
            <FilterByRegion />
            <FilterByCategory />
            <SearchVacancies />
          </div>
          {/* <div>
            <SortBySalary />
          </div> */}
          <div className="w-full">
            <FilterBySalary />
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto border border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 transition-all duration-150">
          <thead
            className={`${
              !isDark ? "bg-primary-800" : "bg-gray-50"
            } transition-all duration-150`}
          >
            <tr>
              <th
                scope="col"
                className={`px-6 py-3  text-left text-xs font-medium ${
                  !isDark ? "text-stone-200" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                პოზიცია
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider ${
                  !isDark ? "text-stone-100" : "text-gray-500"
                }`}
              >
                მომწოდებელი
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider ${
                  !isDark ? "text-stone-100" : "text-gray-500"
                }`}
              >
                ხელფასი
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider ${
                  !isDark ? "text-stone-100" : "text-gray-500"
                }`}
              >
                გამოქვეყნდა
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider ${
                  !isDark ? "text-stone-100" : "text-gray-500"
                }`}
              >
                ბოლო ვადა
              </th>
            </tr>
          </thead>
          <tbody
            className={`${
              !isDark ? "bg-primary-800" : "bg-white"
            } divide-y divide-gray-200 transition-all duration-150`}
          >
            {infiniteData?.map(
              (data: {
                documents: {
                  $id: Key | null | undefined;
                  caption: string;
                  companies: { $id: string };
                  name: string;
                  salary: number;
                  $createdAt: string;
                }[];
              }) =>
                data.documents.map(
                  (job: {
                    $id: Key | null | undefined;
                    caption: string;
                    companies: { $id: string };
                    name: string;
                    salary: number;
                    $createdAt: string;
                  }) => (
                    <tr key={job.$id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-xs sm:text-sm font-medium ${
                            !isDark ? "text-stone-100" : "text-gray-800"
                          }`}
                        >
                          <Link
                            className="hover:underline"
                            to={`/vacancies/${job.$id}`}
                          >
                            {job.caption}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-xs sm:text-sm font-medium ${
                            !isDark ? "text-stone-100" : "text-gray-800"
                          }`}
                        >
                          <Link
                            className="hover:underline"
                            to={`/company/${job?.companies?.$id}`}
                          >
                            {job.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-xs sm:text-sm font-medium ${
                            !isDark ? "text-stone-100" : "text-gray-800"
                          }`}
                        >
                          <p>{formatCurrency(job.salary)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-xs sm:text-sm font-medium ${
                            !isDark ? "text-stone-100" : "text-gray-800"
                          }`}
                        >
                          {formatDateString(job.$createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-xs sm:text-sm font-medium ${
                            !isDark ? "text-stone-100" : "text-gray-800"
                          }`}
                        >
                          {calculateEndDate(job.$createdAt, 120)}
                        </div>
                      </td>
                    </tr>
                  )
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center py-4">
        <Button
          variant="ghost"
          color="primary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={`${!isDark && "text-stone-200"}`}
        >
          {isFetchingNextPage ? (
            <SmallSpinner />
          ) : hasNextPage ? (
            "Load More"
          ) : (
            "Nothing more to load"
          )}
        </Button>
      </div>
    </div>
  );
}
