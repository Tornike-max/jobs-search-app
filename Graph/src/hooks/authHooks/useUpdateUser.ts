import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAuthUser } from "../../services/api";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      name,
      phone,
      email,
      password,
      userId,
    }: {
      name?: string;
      phone?: string;
      email?: string;
      password?: string;
      userId?: string;
    }) => updateAuthUser({ name, email, phone, password, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
      toast.success("User updated successfully");
    },
    onError: () => {
      toast.error("Error while updating user");
    },
  });
  return { mutate, isPending };
}
