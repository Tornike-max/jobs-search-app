import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogout } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutUser, isPending: isLogingOut } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Log out");
      navigate("/login");
    },
    onError: () => {
      toast.error("Couldn't log out");
    },
  });

  return { logoutUser, isLogingOut };
}
