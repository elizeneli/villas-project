import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
// import AddBooking from "../features/bookings/AddBooking";
// import CreateBookingForm from "../features/bookings/CreateBookingForm";

function Bookings() {
  return (
    <>
      <Heading as="h1">All bookings</Heading>
      {/* <AddBooking /> */}
      <Row type="horizontal">
        <BookingTableOperations />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
