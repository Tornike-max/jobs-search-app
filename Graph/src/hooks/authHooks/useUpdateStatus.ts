import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../../services/api";
import toast from "react-hot-toast";

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending: isStatusUpdatings } = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) =>
      updateUserStatus({ userId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
      toast.success("Status Changed Successfully");
    },
    onError: () => {
      toast.error("Error while updating status");
    },
  });
  return { updateStatus, isStatusUpdatings };
}
