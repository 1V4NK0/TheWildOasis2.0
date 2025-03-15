import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

//THIS HOOK IS USED FOR FETCHING AND CACHING, enhances the fetching process by adding:
//caching, refetching, error, loading handlingm query invalidation


export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTERING
  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };

  // SORTING
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Fetch data with filtering & sorting
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, error, bookings };
}

