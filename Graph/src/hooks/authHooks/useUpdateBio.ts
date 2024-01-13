import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserBio } from "../../services/api";
import toast from "react-hot-toast";

export function useUpdateBio() {
  const queryClient = useQueryClient();

  const { mutate: addBio, isPending: isBioAdding } = useMutation({
    mutationFn: ({ userId, bio }: { userId: string; bio: string }) =>
      updateUserBio({ userId, bio }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
      toast.success("Bio added successfully");
    },
    onError: () => {
      toast.error("Error while creating bio");
    },
  });

  return { isBioAdding, addBio };
}
