import { useQuery } from "@tanstack/react-query";
import { getUsersFromDB } from "../../services/api";

export function useGetAllUsersFromDB() {
  const { data: users, isPending: isUsersPending } = useQuery({
    queryKey: ["db-users"],
    queryFn: getUsersFromDB,
  });

  return { users, isUsersPending };
}
