import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortfolio } from "../../services/api";
import { INewPortfolio } from "../../types/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCreatePortfolio() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: (portfolio: INewPortfolio) => createPortfolio(portfolio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });

      toast.success(`Portfolio created successfully`);
      navigate("/");
    },
    onError: () => {
      toast.error(`Error creating portfolio`);
    },
  });
  return { create, isCreating };
}
