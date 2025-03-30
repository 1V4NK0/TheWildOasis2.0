import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
//FINISH
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //removeQueries() - clears all the cached data about user
  //replace: true means that you can't go back to the prev page
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}
