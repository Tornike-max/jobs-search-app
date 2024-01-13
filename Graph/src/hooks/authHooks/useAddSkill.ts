import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewSkill } from "../../services/api";
import toast from "react-hot-toast";

export function useAddSkill() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ skill, userId }: { skill: string; userId: string }) =>
      addNewSkill(skill, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
    },
    onError: () => {
      toast.error("Error while adding skill");
    },
  });

  return { mutate, isPending };
}
