import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "../../services/api";
import toast from "react-hot-toast";

export function useDeletePortfolio() {
  const queryClient = useQueryClient();
  const { mutate: deletePost, isPending: isPostDeleting } = useMutation({
    mutationFn: (documentId: string) => deleteImage(documentId),

    onSuccess: () => {
      toast.success("Post delete successfully");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: () => {
      toast.error("Error while deleting");
    },
  });

  return { deletePost, isPostDeleting };
}
