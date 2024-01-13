import { Chip } from "@nextui-org/react";
import { useDarkMode } from "../../context/useDarkMode";

export default function StatementHeader() {
  const { isDark } = useDarkMode();
  return (
    <div
      className={`w-full ${
        !isDark ? "bg-primary-800 shadow-lg" : "bg-primary-600"
      } py-20 px-4 rounded-t-lg flex justify-center items-center flex-col gap-10 text-stone-200 transition-all duration-150`}
    >
      <div className="max-w-md w-full flex justify-center items-center flex-col gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-bold">
          დაიჭირე მომენტი!
        </h1>
        <div className="w-full  border-[2px] border-stone-200"></div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-normal">
          შექმენი ისტორია!
        </h1>
      </div>

      <Chip
        variant="bordered"
        size="lg"
        className=" hover:bg-primary-500 text-stone-200 py-4"
      >
        ყველა პროფესიონალი ერთ სივრცეში
      </Chip>
    </div>
  );
}
