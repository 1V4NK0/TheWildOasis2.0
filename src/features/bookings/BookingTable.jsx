import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  //FILTERING
  const filterValue = searchParams.get("status") || "all";
  let filteredBookings;
  if (filterValue === "all") filteredBookings = bookings;
  if (filterValue === "checked-out")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-out"
    );
  if (filterValue === "checked-in")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "checked-in"
    );
  if (filterValue === "unconfirmed")
    filteredBookings = bookings.filter(
      (booking) => booking.status === "unconfirmed"
    );

  //SORTING
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedAndFilteredBookings;

  sortedAndFilteredBookings = filteredBookings.sort((a, b) => {
    if (typeof a[field] === "string") {
      //localeCompare is used for comparing string alphabetically
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.5fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedAndFilteredBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
