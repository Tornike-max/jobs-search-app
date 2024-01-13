// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { filterJobs } from "../../services/api";
import { Models } from "appwrite";

export function useFilterByJobs(
  region: string,
  getCategory: string,
  search: string,
  getSalary: string,
  getSortSalary: string
) {
  const options: UseInfiniteQueryOptions<Models.Document, Error> = {
    queryKey: [
      `search-${search}`,
      `filterByRegion-${region}`,
      `filterByCategory-${getCategory}`,
      `filterBySalary-${getSalary}`,
      `sortBySalary-${getSortSalary}`,
    ],
    queryFn: (pageParam) =>
      filterJobs(
        region,
        getCategory,
        search,
        getSalary,
        getSortSalary,
        pageParam
      ).then((documents) => ({ documents })),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents && lastPage.documents.length > 0) {
        const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
        return lastId;
      }
      return null;
    },
  };

  return useInfiniteQuery(options);
}
// const { data, isPending } = useQuery({
// queryKey: [
//   `search-${search}`,
//   `filterByRegion-${region}`,
//   `filterByCategory-${getCategory}`,
//   `filterBySalary-${getSalary}`,
//   `sortBySalary-${getSortSalary}`,
// ],
//   queryFn: () => filterJobs(region, getCategory, search, getSalary),
// });

// return { data, isPending };
