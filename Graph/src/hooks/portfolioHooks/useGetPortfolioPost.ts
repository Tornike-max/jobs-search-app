// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/api";

export function useGetPortfolioPost() {
  return useInfiniteQuery({
    queryKey: ["portfolio"],
    queryFn: getAllPosts,
    getNextPageParam: (lastPage) => {
      const lastDocument = lastPage?.documents[lastPage?.documents?.length - 1];
      return lastDocument?.$id ?? null;
    },
  });
}
