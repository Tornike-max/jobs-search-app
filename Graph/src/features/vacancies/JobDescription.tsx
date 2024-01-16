import { Button } from "@nextui-org/button";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleJob } from "../../hooks/jobHooks/useGetSingleJob";
import Loader from "../../ui/Loader";
import { formatDateString } from "../../ui/formatDateString";
import { calculateEndDate } from "../../ui/calculateEndDate";
import { formatCurrency } from "../../ui/formatCurrency";
import { useDarkMode } from "../../context/useDarkMode";

export default function JobDescription() {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const { vacancieId } = useParams();
  const { data, isPending } = useGetSingleJob(vacancieId || "");

  if (isPending) return <Loader color="primary" />;
  function handleNavigate() {
    navigate(`/company/${data?.companies?.$id}`);
  }
  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center flex-col gap-10 px-10 py-6">
      <div className="w-full flex justify-center items-start flex-col gap-4">
        <h1
          className={`text-xl sm:text-2xl ${
            !isDark ? "text-stone-200" : "text-stone-600"
          }  font-semibold`}
        >
          {data?.category}
        </h1>
        <div className="flex justify-start items-center gap-4 text-sm text-primary-600">
          <Button
            variant="ghost"
            color="primary"
            size="sm"
            onClick={() => navigate(-1)}
            className={`flex items-center gap-1 ${!isDark && "text-stone-200"}`}
          >
            <HiOutlineArrowLeft />
            <span>უკან დაბრუნება</span>
          </Button>
          <Button
            onClick={() => handleNavigate()}
            size="sm"
            variant="ghost"
            color="primary"
            className={`${!isDark && "text-stone-200"}`}
          >
            კომპანიის შესახებ
          </Button>
        </div>
      </div>
      <div
        className={`w-full flex justify-center items-start flex-col text-sm  px-2 py-1 rounded-md gap-1 ${
          !isDark ? "text-stone-200 bg-primary-800" : "bg-stone-300"
        }`}
      >
        <p className="border-b-1 border-t-1 w-full py-1">
          დასახელება: <span className="font-semibold">{data?.category}</span>
        </p>
        <p className="border-b-1 w-full py-1">
          მომწოდებელი:{" "}
          <span
            onClick={handleNavigate}
            className="font-semibold cursor-pointer hover:underline"
          >
            {data?.name}
          </span>
        </p>
        <p className="border-b-1 w-full py-1">
          ხელფასი:{" "}
          <span className="font-semibold">
            {formatCurrency(data?.salary, "GEL")}
          </span>
        </p>
        <p className="border-b-1 w-full py-1">
          ხელფასის ტიპი:{" "}
          <span className="font-semibold">{data?.paymentMethod}</span>
        </p>
        <span className="border-b-1 w-full py-1">
          ლოკაცია: <span className="font-semibold">{data?.location}</span>
        </span>
        <p className="border-b-1 w-full py-1">
          გამოქვეყნდა:{" "}
          <span className="font-semibold">
            {formatDateString(data?.$createdAt || "")}
          </span>
          / ბოლო ვადა:{" "}
          <span className="font-semibold">
            {" "}
            {calculateEndDate(data?.$createdAt || "", 120)}
          </span>
        </p>
      </div>

      <div
        className={`w-full flex justify-start items-center text-sm ${
          !isDark ? "text-stone-200" : "text-stone-600"
        }`}
      >
        <span>{data?.description}</span>
      </div>
    </div>
  );
}
