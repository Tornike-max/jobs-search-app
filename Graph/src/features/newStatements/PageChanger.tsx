// import { Button } from "@nextui-org/button";
// import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
// import { useSearchParams } from "react-router-dom";

// export default function PageChanger({ usersLenght }: { usersLength: number }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = searchParams.get("page") || 1;
//   function nextPageFunc(value: string) {
//     const nextPage = Number(currentPage) + Number(value);
//     searchParams.set("page", String(nextPage));
//     setSearchParams(searchParams);
//   }

//   function prevPageFunc(value: string) {
//     const prevPage = Math.max(Number(currentPage) - Number(value), 1);
//     searchParams.set("page", String(prevPage));
//     setSearchParams(searchParams);
//   }

//   return (
//     <div className="w-full flex items-center gap-4">
//       <Button
//         disabled={Number(currentPage) === 1}
//         onClick={() => prevPageFunc("1")}
//         type="button"
//         variant="ghost"
//       >
//         <HiOutlineArrowLeft />
//         <span>Previouse</span>
//       </Button>
//       <span>{""}</span>
//       <Button
//         disabled={Number(currentPage) === usersLenght}
//         onClick={() => nextPageFunc("1")}
//         type="button"
//         variant="ghost"
//       >
//         <span>Next</span>
//         <HiOutlineArrowRight />
//       </Button>
//     </div>
//   );
// }
