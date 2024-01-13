import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../ui/Loader";
import { Button } from "@nextui-org/button";
import { HiOutlineArrowLeft, HiOutlinePencil } from "react-icons/hi2";
import { calculateEndDate } from "../../ui/calculateEndDate";
import { formatDateString } from "../../ui/formatDateString";
import { useGetSingleCompany } from "../../hooks/companiesHook/useGetSingleCompany";
import { useDarkMode } from "../../context/useDarkMode";

export default function CompanyDescription() {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { isDark } = useDarkMode();
  const { data, isPending } = useGetSingleCompany(companyId || "");

  if (isPending) return <Loader color="primary" />;
  console.log(data);

  function handleNavigate(id: string) {
    navigate(`/company/edit/${id}`);
  }
  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center flex-col px-10 gap-10">
      <div className="w-full flex justify-center items-start gap-6 flex-col">
        <Button
          variant="ghost"
          color="primary"
          size="sm"
          className={`flex items-center gap-1 ${!isDark && "text-stone-200"}`}
          onClick={() => navigate(`/vacancies`)}
        >
          <HiOutlineArrowLeft />
          <span>უკან დაბრუნება</span>
        </Button>
        <h1
          className={`text-xl sm:text-3xl font-semibold ${
            !isDark ? "text-stone-200" : "text-stone-600"
          } `}
        >
          {data?.name}
        </h1>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead
          className={` ${
            !isDark ? "bg-primary-800" : "bg-gray-50"
          } duration-150 transition-all`}
        >
          <tr>
            <th
              scope="col"
              className={`px-6 py-3  text-left text-xs font-medium ${
                !isDark ? "text-stone-200" : "text-gray-500"
              }  uppercase tracking-wider`}
            >
              პოზიცია
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium ${
                !isDark ? "text-stone-100" : "text-gray-500"
              } text-gray-500 uppercase tracking-wider`}
            >
              მომწოდებელი
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium ${
                !isDark ? "text-stone-100" : "text-gray-500"
              } text-gray-500 uppercase tracking-wider`}
            >
              გამოქვეყნდა
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium ${
                !isDark ? "text-stone-100" : "text-gray-500"
              } text-gray-500 uppercase tracking-wider`}
            >
              ბოლო ვადა
            </th>
            <th
              scope="col"
              className={`px-6 py-3 text-left text-xs font-medium ${
                !isDark ? "text-stone-100" : "text-gray-500"
              } text-gray-500 uppercase tracking-wider`}
            ></th>
          </tr>
        </thead>
        <tbody
          className={`${
            !isDark ? "bg-primary-800" : "bg-gray-50"
          } divide-y divide-gray-200`}
        >
          {data?.jobs?.map(
            (job: {
              $id: string;
              caption: string;
              name: string;
              $createdAt: string;
            }) => (
              <tr key={job.$id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-xs sm:text-sm font-medium ${
                      !isDark ? "text-stone-200" : "text-gray-800"
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
                      !isDark ? "text-stone-200" : "text-gray-800"
                    }`}
                  >
                    <Link className="hover:underline" to={``}>
                      {job.name}
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-xs sm:text-sm font-medium ${
                      !isDark ? "text-stone-200" : "text-gray-800"
                    }`}
                  >
                    {formatDateString(job.$createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-xs sm:text-sm font-medium ${
                      !isDark ? "text-stone-200" : "text-gray-800"
                    }`}
                  >
                    {calculateEndDate(job.$createdAt, 120)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    onClick={() => handleNavigate(job.$id)}
                    className={`text-xs cursor-pointer hover:underline sm:text-sm flex items-center gap-1 font-medium ${
                      !isDark ? "text-stone-200" : "text-gray-800"
                    }`}
                  >
                    <span>შესწორება</span>
                    <HiOutlinePencil />
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
