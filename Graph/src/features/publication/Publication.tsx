import { Button } from "@nextui-org/react";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/useDarkMode";

export default function Publication({ data }: { data: Models.Document }) {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();

  function handleChange(value: number) {
    const type = value === 2 ? "Standart" : "VIP";

    navigate(`/createPublication/${type}/${data.$id}`);
  }
  return (
    <div className="max-w-[1920px] w-full flex justify-center items-center flex-col">
      <div
        className={`w-full ${
          !isDark ? "bg-primary-800 shadow-xl" : "bg-primary-600"
        } h-full py-10 px-10 flex justify-center items-center flex-col text-stone-200  gap-4`}
      >
        <div className="max-w-xl w-full space-y-4">
          <h1 className="text-2xl text-center">გამოაქვეყნე შენი კანდიდატურა</h1>
        </div>
        <div className="border-stone-200 rounded-xl border-[1px] max-w-xl w-full"></div>

        <div>
          <Button
            className="text-stone-200 hover:text-stone-800"
            variant="ghost"
            color="default"
            size="lg"
          >
            იხილე ტარიფები
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-center items-center flex-col py-6 gap-10">
        <h1
          className={`text-xl ${
            !isDark ? "text-stone-200" : "text-primary-600"
          }  font-semibold text-center`}
        >
          ტარიფები
        </h1>
        <div className="flex justify-start items-start w-full px-24">
          <div className={`flex flex-col gap-1 ${!isDark && "text-stone-200"}`}>
            <h3 className="text-base cursor-pointer hover:underline hover:decoration-1">
              სტანდარტული განცხადებები
            </h3>
            <span className="text-sm">
              სტანდარტული განცხადების გამოსაქვეყნებლად საჭიროა, რომ გაიაროთ
              ავტორიზაცია, ამის შემდეგ თქვენ შეგეძლებათ წარადგინოთ თქვენი
              კანდიდატურა. თქვენ მიერ გამოქვეყნებული განცხადება განთავსდება
              ჩვენს ვებგვერდზე, რის შემდეგაც დამსაქმებლები შეძლებენ თქვენთან
              დაკავშირებას.
            </span>
            <span className="border-[0.5px] border-stone-800 w-full my-4"></span>
            <span className="text-sm">
              სტანდარტული განცხადება: {data?.publication_price} {data.currency}
            </span>
            <div className="w-full flex justify-end items-center">
              <Button
                onClick={() => handleChange(data?.publication_price)}
                variant="ghost"
                color="primary"
                className={`${!isDark && "text-stone-200"}`}
              >
                გამოაყვეყნე სტანდარტული განცხადება
              </Button>
            </div>
          </div>
        </div>
        <span className="border-[0.5px] border-stone-800 w-full px-24"></span>
        <div className="flex justify-start items-start w-full px-24">
          <div className={`${!isDark && "text-stone-200"} flex flex-col gap-1`}>
            <h3 className="text-base cursor-pointer hover:underline hover:decoration-1">
              VIP-განცხადებები
            </h3>
            <span className="text-sm">
              სტანდარტული განცხადების გამოსაქვეყნებლად საჭიროა, რომ გაიაროთ
              ავტორიზაცია, ამის შემდეგ თქვენ შეგეძლებათ წარადგინოთ თქვენი
              კანდიდატურა. თქვენ მიერ გამოქვეყნებული განცხადება განთავსდება
              ჩვენს ვებგვერდზე, რის შემდეგაც დამსაქმებლები შეძლებენ თქვენთან
              დაკავშირებას.
            </span>
            <span className="border-[0.5px] border-stone-800 w-full my-4"></span>
            <span className="text-sm">
              VIP-განცხადება: {data?.vip_publication_price} {data.currency}
            </span>
            <div className="w-full flex justify-end items-center">
              <Button
                onClick={() => handleChange(data?.vip_publication_price)}
                variant="ghost"
                color="primary"
                className={`${!isDark && "text-stone-200"}`}
              >
                გამოაქვეყნე VIP-განცხადება
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
