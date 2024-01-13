import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewLocation } from "../../services/api";
import toast from "react-hot-toast";

export function useAddLocation() {
  const queryClient = useQueryClient();
  const { mutate: addLocation, isPending: isLocationAdding } = useMutation({
    mutationFn: ({ location, userId }: { location: string; userId: string }) =>
      addNewLocation({ location, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
      toast.success("Location added successfully");
    },
    onError: () => {
      toast.error("Error while adding location");
    },
  });

  return { addLocation, isLocationAdding };
}
