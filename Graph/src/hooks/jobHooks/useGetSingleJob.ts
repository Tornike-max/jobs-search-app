import { useQuery } from "@tanstack/react-query";
import { getSingleJob } from "../../services/api";

export function useGetSingleJob(vacancieId: string) {
  const { data, isPending } = useQuery({
    queryKey: ["jobs", `jobId-${vacancieId}`],
    queryFn: () => getSingleJob(vacancieId),
  });

  return { data, isPending };
}
