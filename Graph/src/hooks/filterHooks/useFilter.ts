import { useQuery, useQueryClient } from "@tanstack/react-query";
import { filterUsers } from "../../services/api";
import { useEffect } from "react";

export function useFilter(
  currentValue: string,
  curPage: number,
  skillLevel: string,
  searchedValue: string,
  getFilterPrice: string,
  getGender: string,
  shootStyle: string,
  getSortedAge: string,
  getSortedPrice: string
) {
  const queryClient = useQueryClient();
  const {
    data: filtered,
    isPending: isFiltering,
    refetch,
  } = useQuery({
    queryKey: [
      "db-users",
      `FilterBy-${currentValue}`,
      `currentPage-${curPage}`,
      `skillLevel-${skillLevel}`,
      `searchBy-${searchedValue}`,
      `filterByPrice-${getFilterPrice}`,
      `filtedByGender-${getGender}`,
      `shootStyle-${shootStyle}`,
      `sortedByAge-${getSortedAge}`,
      `sortedByPrice-${getSortedPrice}`,
    ],
    queryFn: () =>
      filterUsers(
        currentValue,
        curPage,
        skillLevel,
        searchedValue,
        getFilterPrice,
        getGender,
        shootStyle,
        getSortedAge,
        getSortedPrice
      ),
  });

  useEffect(() => {
    refetch();
    queryClient.prefetchQuery({
      queryKey: [
        "db-users",
        `FilterBy-${currentValue}`,
        `currentPage-${curPage + 1}`,
      ],
    });
  }, [curPage, filtered]);

  return { filtered, isFiltering };
}
