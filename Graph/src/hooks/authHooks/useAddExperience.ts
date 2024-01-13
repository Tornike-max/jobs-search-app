import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExperienceAndEducation } from "../../services/api";
import toast from "react-hot-toast";

export function useAddExperience() {
  const queryCient = useQueryClient();
  const { mutate: addExpAndEdu, isPending: isAdding } = useMutation({
    mutationFn: ({
      experience,
      education,
      userId,
    }: {
      experience: string;
      education: string;
      userId: string;
    }) => addExperienceAndEducation({ experience, education, userId }),
    onSuccess: () => {
      queryCient.invalidateQueries({ queryKey: ["db-users"] });
      toast.success("Success");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return { addExpAndEdu, isAdding };
}
