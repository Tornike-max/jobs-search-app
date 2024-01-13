import { useQuery } from "@tanstack/react-query";
import { getAboutInfo } from "../../services/api";

export function useGetAboutInfo() {
  const {
    data: aboutData,
    isPending: isAboutPending,
    error,
  } = useQuery({
    queryKey: ["about"],
    queryFn: getAboutInfo,
  });

  if (error) throw new Error("Error while querying data");

  return { aboutData, isAboutPending };
}
