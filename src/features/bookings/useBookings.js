import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

//THIS HOOK IS USED FOR FETCHING AND CACHING, enhances the fetching process by adding:
//caching, refetching, error, loading handlingm query invalidation
export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({ queryKey: ["bookings"], queryFn: getBookings });

  return { isLoading, error, bookings };
}
