import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJob } from "../../services/api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { HiOutlinePubType } from "../../types/types";

export function useUpdateJob() {
  const { editId: documentId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: editData, isPending: isDataEditing } = useMutation({
    mutationFn: (updatedData: HiOutlinePubType) =>
      updateJob(documentId || "", updatedData),
    onSuccess: () => {
      toast.success(" მონაცემები წარმატებით განახლდა");
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
    onError: () => {
      toast.error("სამწუხაროდ თქვენი მონაცემები ვერ განახლდა");
    },
  });

  return { editData, isDataEditing };
}
