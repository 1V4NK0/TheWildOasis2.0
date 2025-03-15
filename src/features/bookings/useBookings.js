import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

//THIS HOOK IS USED FOR FETCHING AND CACHING, enhances the fetching process by adding:
//caching, refetching, error, loading handlingm query invalidation

export function useBookings() {
  //get sorting and filtering parameters from the URL
  const [searchParams] = useSearchParams();

  // FILTERING
  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };

  // SORTING
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Fetch data with filtering & sorting
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return {
    isLoading,
    error,
    bookings: data?.data || [],
    count: data?.count || 0,
  };
}
