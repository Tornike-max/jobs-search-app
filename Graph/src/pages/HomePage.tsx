// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { Button } from "@nextui-org/button";
import Home from "../features/home/Home";
import { useGetPortfolioPost } from "../hooks/portfolioHooks/useGetPortfolioPost";
import Loader from "../ui/Loader";
import SmallSpinner from "../ui/SmallSpinner";
import { useGetAllUsersFromDB } from "../hooks/authHooks/useGetAllUsersFromDB";
import { useDarkMode } from "../context/useDarkMode";

export default function HomePage() {
  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useGetPortfolioPost();
  const { users, isUsersPending } = useGetAllUsersFromDB();
  const { isDark } = useDarkMode();

  if (status === "pending" || isUsersPending) return <Loader color="primary" />;

  const results = posts?.pages.map((item) => item?.documents);

  return (
    <>
      <Home posts={results} users={users} />
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
    </>
  );
}
