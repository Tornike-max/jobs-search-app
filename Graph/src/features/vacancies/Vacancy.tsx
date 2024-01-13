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
import SortBySalary from "./SortBySalary";
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
  console.log(getSortSalary);

  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFilterByJobs(
      getLocation,
      getCategory,
      searchValue,
      getSalary,
      getSortSalary
    );

  if (!data || isPending) return <Loader color="primary" />;

  let sortedSalary;

  // if (getSortSalary === "") sortedSalary = data?.map((d) => d);
  // if (getSortSalary === "asc")
  //   sortedSalary = data?.sort((a, b) => a.salary - b.salary);
  // if (getSortSalary === "desc")
  //   sortedSalary = data?.sort((a, b) => b.salary - a.salary);
  const infiniteData = data.pages;
  console.log(infiniteData);

  console.log(sortedSalary);

  return (
    <div className="max-w-[1920px] mx-auto py-6 sm:px-6 lg:px-8">
      <div className="w-full flex justify-center items-center flex-col pb-8 gap-4">
        <h1
          className={`text-xl sm:text-3xl font-semibold ${
            !isDark ? "text-stone-200" : "text-primary-600"
          }`}
        >
          ყველა განცხადება ერთ სივრცეში
        </h1>
        <Button
          onClick={() => navigate(`/publication`)}
          variant="ghost"
          className={`${!isDark && "text-stone-200"}`}
          color="primary"
        >
          შექმენი განცხადება
        </Button>
      </div>
      <div className="w-full flex justify-end items-center mb-2">
        <div className="max-w-2xl w-full flex-col  flex justify-center items-center gap-4 m-auto">
          <div className="flex items-center gap-4">
            <FilterByRegion />
            <FilterByCategory />
            <SearchVacancies />
          </div>
          <div>
            <SortBySalary />
          </div>
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
                          <Link
                            className="hover:underline"
                            to={`/company/${job?.companies?.$id}`}
                          >
                            {formatCurrency(job.salary)}
                          </Link>
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
