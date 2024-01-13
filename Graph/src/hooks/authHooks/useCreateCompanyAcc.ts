import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompanyAccount } from "../../services/api";
import { InewCompany } from "../../types/types";
import toast from "react-hot-toast";

export function useCreateCompanyAcc() {
  const queryClient = useQueryClient();
  const { mutateAsync: createCompany, isPending: isCompanyCreating } =
    useMutation({
      mutationFn: (newCompany: InewCompany) => createCompanyAccount(newCompany),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["company"] });
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });

  return { createCompany, isCompanyCreating };
}
