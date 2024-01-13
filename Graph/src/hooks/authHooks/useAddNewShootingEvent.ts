import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewShootingStyle } from "../../services/api";
import toast from "react-hot-toast";

export function useAddNewShootingEvent() {
  const queryClient = useQueryClient();
  const { mutate: addEvent, isPending: isAddingEvent } = useMutation({
    mutationFn: ({ event, userId }: { event: string; userId: string }) =>
      addNewShootingStyle(event, userId),
    onSuccess: () => {
      toast.success("daemate");
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
    },
    onError: () => {
      toast.error("Opps, თავიდან სცადეთ");
    },
  });

  return { addEvent, isAddingEvent };
}
