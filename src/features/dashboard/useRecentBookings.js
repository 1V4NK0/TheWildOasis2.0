import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

//PURPOSE: TO RETURN BOOKINGS FROM THE LAST X DAYS, BASED ON FILTER, URL
//BE AWARE AS THE TIME GOES ON IT MIGHT NOT RETURN ANYTHING AS THE BOOKINGS ARE MORE THAN 90 DAYS OLD, USE UPLOADER COMPONENT TO REUPLOAD 
export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
