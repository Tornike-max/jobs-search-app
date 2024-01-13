import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/api";
import { IlogInUser } from "../../types/types";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutateAsync: login, isPending: isLogingin } = useMutation({
    mutationFn: (user: IlogInUser) => loginUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
      toast.success("User Successfully logged in");
    },
    onError: () => {
      toast.error("Error while logging in");
    },
  });

  return { login, isLogingin };
}
