import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewLinks } from "../../services/api";
import toast from "react-hot-toast";

export function useAddUrl() {
  const queryClient = useQueryClient();
  const { mutate: addLink, isPending: isLinkAdding } = useMutation({
    mutationFn: ({
      instagramUrl,
      linkedinUrl,
      userId,
    }: {
      instagramUrl: string;
      linkedinUrl: string;
      userId: string;
    }) => addNewLinks({ instagramUrl, linkedinUrl, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["db-users"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Error while add new link");
    },
  });

  return { addLink, isLinkAdding };
}
