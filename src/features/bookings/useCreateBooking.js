import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  //object to manage the cache and state, fetching
  const queryClient = useQueryClient();

  //using useMutation hooks besides directly calling addNewBooking has benefits such as: cache invalidation, error and success handling, and other thing
  //basically this thing allows you to do additional stuff when u call addNewBooking and it's kinda wrapper
  const { mutate: createBooking, isLoading: isAdding } = useMutation({
    mutationFn: addNewBooking,
    onSuccess: () => {
      toast.success("New booking successfully added.");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding, createBooking };
}
