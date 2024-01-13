import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userLikePost } from "../../services/api";

export function useLike() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => userLikePost(postId, likesArray),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
    },
    onError: () => {
      toast.error("Can't like ");
    },
  });

  return { mutate, isPending };
}
