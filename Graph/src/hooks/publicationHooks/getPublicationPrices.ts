import { useQuery } from "@tanstack/react-query";
import { getPublicationPrices } from "../../services/api";

export function useGetPublicationPrices() {
  const { data, isPending } = useQuery({
    queryKey: ["publications"],
    queryFn: getPublicationPrices,
  });

  return { data, isPending };
}
