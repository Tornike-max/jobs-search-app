import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserPassword } from "../../services/api";
import toast from "react-hot-toast";

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { mutate: updatePassword, isPending: isPasswordUpdating } = useMutation(
    {
      mutationFn: ({
        password,
        oldPassword,
      }: {
        password: string;
        oldPassword: string;
      }) => changeUserPassword(password, oldPassword),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        toast.success("Password updated successfully");
      },
      onError: () => {
        toast.error("Couldn't update password");
      },
    }
  );

  return { updatePassword, isPasswordUpdating };
}
