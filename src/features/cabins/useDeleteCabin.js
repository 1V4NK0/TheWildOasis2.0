import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
  //cache manager, it stores, manages and invalidates queries which allows for automatic UI update when data changes
  const queryClient = useQueryClient();

  //deleteCabin only deletes cabin but it does not make refresh UI to show new list of cabins
  //for this u need to invalidate to make it refresh
  //useMutation hook is designed for changing data from an API (deleting, adding, updating)
  //while useQuery hook is designed just for fetching
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("cabin was deleted");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
