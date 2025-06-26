import NewBookingForm from "../features/bookings/NewBookingForm";
import Heading from "../ui/Heading";

function NewBooking() {
  return (
    <>
      <Heading as="h2">Add new booking</Heading>
      <NewBookingForm />
    </>
  );
}

export default NewBooking;
