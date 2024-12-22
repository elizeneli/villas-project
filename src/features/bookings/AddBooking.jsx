import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateBookingFrom from "../bookings/CreateBookingForm";

function AddBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button>Create New Booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingFrom />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
