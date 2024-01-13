import { useQuery } from "@tanstack/react-query";
import { getUserFromDB } from "../../services/api";

export function useGetUserFromDB(accountId: string) {
  const { data: userData, isPending: isUserPending } = useQuery({
    queryKey: ["db-users", accountId],
    queryFn: () => getUserFromDB(accountId),
  });

  return { userData, isUserPending };
}
