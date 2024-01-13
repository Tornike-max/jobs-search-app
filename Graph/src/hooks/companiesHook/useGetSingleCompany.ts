import { useQuery } from "@tanstack/react-query";
import { getSingleCompany } from "../../services/api";

export function useGetSingleCompany(companyId: string) {
  const { data, isPending } = useQuery({
    queryKey: ["company", `companyId-${companyId}`],
    queryFn: () => getSingleCompany(companyId),
  });

  return { data, isPending };
}
