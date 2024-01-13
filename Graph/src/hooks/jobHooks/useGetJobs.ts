import { useQuery } from "@tanstack/react-query";
import { getVacancies } from "../../services/api";

export function useGetJobs() {
  const { data: jobs, isPending: isJobsPending } = useQuery({
    queryKey: ["jobs"],
    queryFn: getVacancies,
  });

  return { jobs, isJobsPending };
}
