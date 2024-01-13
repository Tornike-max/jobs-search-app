import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useChangePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const changeCurPage = async (curPage: number) => {
    setSearchParams(
      new URLSearchParams({ ...searchParams, page: String(curPage) })
    );
    await queryClient.invalidateQueries({
      queryKey: ["db-users", `page-${curPage}`],
    });
  };

  return { changeCurPage };
}
