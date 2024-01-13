import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewJob } from "../../services/api";
import toast from "react-hot-toast";
import { HiJobType } from "../../types/types";

export function useCreateJob() {
  const queryClient = useQueryClient();
  const { mutate: createJobs, isPending: isJobsPending } = useMutation({
    mutationFn: (newJob: HiJobType) => createNewJob(newJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("თქვენი განცხადება წარმატებით გამოქვეყნდა");
    },
    onError: () => {
      toast.error(
        "თქვენი განცხადების გამოქვეყნება ვერ მოხერხდა. თავიდან სცადეთ"
      );
    },
  });

  return { createJobs, isJobsPending };
}
