import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InewUser } from "../../types/types";
import { createNewUser } from "../../services/api";
import toast from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();
  const { mutateAsync: signup, isPending: isRegistring } = useMutation({
    mutationFn: (user: InewUser) => createNewUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("User has been registered");
    },
    onError: () => {
      throw new Error("Error while creating user");
    },
  });

  return { signup, isRegistring };
}
