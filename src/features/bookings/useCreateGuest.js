import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: addGuest, isLoading } = useMutation({
    mutationFn: addNewGuest,
    onSuccess: () => {
      toast.success("New guest successfully added.");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: toast.error("Could not create a new guest"),
  });

  return { isLoading, addGuest };
}
