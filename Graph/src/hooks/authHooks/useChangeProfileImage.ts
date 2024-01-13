import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeProfile } from "../../services/api";
import toast from "react-hot-toast";
export function useChangeProfileImage() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ userId, file }: { userId?: string; file: File }) =>
      changeProfile({ file, userId: userId || "defaultUserId" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["db-users"] });

      toast.success("Profile image Changed successfully");
    },
    onError: () => {
      toast.error("Error while changing profile image");
    },
  });

  return { mutate, isPending };
}
