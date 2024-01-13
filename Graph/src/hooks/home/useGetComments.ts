import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/api";

export function useGetComments(postId: string) {
  const { data, isPending } = useQuery({
    queryFn: () => getComments(postId),
    queryKey: ["comments", `${postId}`],
  });

  return { data, isPending };
}
