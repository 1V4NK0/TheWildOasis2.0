import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();
  console.log(bookings.at(2));
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.5fr 1.4fr 1.4fr 1fr 2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
