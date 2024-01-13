import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userCommentsOnPost } from "../../services/api";

export function useComment(postId: string) {
  const queryClient = useQueryClient();
  const { mutate: addComment, isPending: isCommentAdded } = useMutation({
    mutationFn: ({
      postId,
      userId,
      comment,
    }: {
      postId: string;
      userId: string;
      comment: string;
    }) => userCommentsOnPost({ postId, userId, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`comments`, `${postId}`],
      });
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });

      toast.success("You successfully added comment");
    },
    onError: () => {
      toast.error("An error has occurred");
    },
  });

  return { addComment, isCommentAdded };
}
