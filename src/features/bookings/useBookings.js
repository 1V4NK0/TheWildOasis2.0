import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

//THIS HOOK IS USED FOR FETCHING AND CACHING, enhances the fetching process by adding:
//caching, refetching, error, loading handlingm query invalidation

export function useBookings() {
  const queryClient = useQueryClient();
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

  //USE QUERY
  // Fetch data with filtering & sorting
  const { isLoading, data, error, count } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-FETCHING, kinda the same as fetching but now you fetch not the curr page but next page
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  return {
    isLoading,
    error,
    bookings: data?.data || [],
    count: data?.count || 0,
  };
}
