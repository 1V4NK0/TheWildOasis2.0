import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

//THIS HOOK IS USED FOR FETCHING AND CACHING, enhances the fetching process by adding:
//caching, refetching, error, loading handlingm query invalidation
export function useBookings() {
  // const [searchParams] = useSearchParams();

  //FILTER
  // const filterValue = searchParams.get("status");
  // const filter =
  //   !filterValue || filterValue === "all"
  //     ? null
  //     : { field: "status", value: filterValue };

  // //SORT
  // const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  // const [field, direction] = sortByRaw.split("-");
  // const sortBy = { field, direction };

  //cool thing about queryKey is if filter obj changes it makes it refetch so it updates
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { isLoading, error, bookings };
}
