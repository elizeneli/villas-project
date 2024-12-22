import { useForm } from "react-hook-form";
import { useCreateBooking } from "../../features/bookings/useCreateBooking";
import { getBookings } from "../../services/apiBookings";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
function CreateBookingForm({ onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  // const { isLoading, error, bookings } = useBookings();
  const { isLoading, cabins, error } = useCabins();
  function onSubmit(data) {
    createBooking(data, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading cabins</div>;
  console.log(cabins, "all cabins");
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isCreating}
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          disabled={isCreating}
          {...register("endDate", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Number of Nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled={isCreating}
          {...register("numNights", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isCreating}
          {...register("numGuests", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Cabin" error={errors?.cabinId?.message}>
        <select
          id="cabinId"
          disabled={isCreating}
          {...register("cabinId", { required: "This field is required" })}
        >
          <option value="">Select a cabin</option>
          {cabins.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          disabled={isCreating}
          {...register("cabinPrice", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Extras Price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          disabled={isCreating}
          {...register("extrasPrice", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Has Breakfast" error={errors?.hasBreakfast?.message}>
        <Input
          type="checkbox"
          id="hasBreakfast"
          disabled={isCreating}
          {...register("hasBreakfast")}
        />
      </FormRow>
      <FormRow label="Is Paid" error={errors?.isPaid?.message}>
        <Input
          type="checkbox"
          id="isPaid"
          disabled={isCreating}
          {...register("isPaid")}
        />
      </FormRow>
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Input
          type="text"
          id="observations"
          disabled={isCreating}
          {...register("observations")}
        />
      </FormRow>
      <FormRow label="Guest ID" error={errors?.guestId?.message}>
        <Input
          type="number"
          id="guestId"
          disabled={isCreating}
          {...register("guestId", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create Booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
