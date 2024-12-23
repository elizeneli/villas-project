import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "../../features/bookings/useCreateBooking";
import { useBookings } from "./useBookings";
import { useSettings } from "../settings/useSettings";
import { useInsertGuestDetails } from "./useInsertGuestDetails";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px var(--color-brand-600);
  border-radius: 8px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--color-brand-600);
`;

function CreateBookingForm({ onCloseModal }) {
  const { isInserting, insertGuestDetails } = useInsertGuestDetails();
  const { isCreating, createBooking } = useCreateBooking();
  const { register, handleSubmit, reset, watch, setValue, formState } =
    useForm();
  const { errors } = formState;

  const { bookings } = useBookings();
  const { isLoading, cabins, error } = useCabins();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const selectedCabinId = watch("cabinId");
  const hasBreakfast = watch("hasBreakfast");
  const numGuests = watch("numGuests");
  const cabinPrice = watch("cabinPrice");
  const extrasPrice = watch("extrasPrice");

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (selectedCabinId) {
      const selectedCabin = cabins.find(
        (cabin) => cabin.id === parseInt(selectedCabinId)
      );
      if (selectedCabin) {
        setValue("cabinPrice", selectedCabin.regularPrice);
      }
    }
  }, [selectedCabinId, cabins, setValue]);

  useEffect(() => {
    let calculatedTotalPrice =
      parseFloat(cabinPrice || 0) + parseFloat(extrasPrice || 0);
    if (hasBreakfast) {
      calculatedTotalPrice += settings.breakfastPrice * (numGuests || 0);
    }
    setTotalPrice(calculatedTotalPrice);
  }, [cabinPrice, extrasPrice, hasBreakfast, numGuests, settings]);

  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(data) {
    console.log("Booking data:", data);

    const guestDetails = {
      fullName: data.fullName,
      email: data.email,
      nationalID: data.nationalId,
      nationality: data.country,
      countryFlag: data.flagCountry,
    };
    const guestData = await insertGuestDetails(guestDetails);
    const guestId = guestData.id;

    const bookingData = {
      startDate: data.startDate,
      endDate: data.endDate,
      numNights: parseInt(data.numNights, 10),
      numGuests: parseInt(data.numGuests, 10),
      extrasPrice: parseFloat(data.extrasPrice),
      cabinId: parseInt(data.cabinId, 10),
      cabinPrice: parseFloat(data.cabinPrice),
      hasBreakfast: data.hasBreakfast || false,
      isPaid: data.isPaid || false,
      observations: data.observations || "",
      status: data.status || "unconfirmed",
      guestId,
      totalPrice,
    };

    if (hasBreakfast) {
      const breakfastCost = settings.breakfastPrice * bookingData.numGuests;
      // Add this to a calculated field, not the booking payload
      bookingData.totalPrice += breakfastCost;
    }

    console.log("Booking data with guestId:", bookingData);
    createBooking(bookingData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (error) return <div>Error loading cabins</div>;

  const bookedCabinIds = [
    ...new Set(bookings.map((booking) => booking.cabins.id)),
  ];
  console.log("Booked Cabin IDs:", bookedCabinIds);

  const availableCabins = cabins.filter(
    (cabin) => !bookedCabinIds.includes(cabin.id)
  );
  console.log("Available Cabins:", availableCabins);
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Section>
        <SectionTitle>Guest Details</SectionTitle>
        <FormRow label="Full Name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            disabled={isInserting}
            {...register("fullName", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            disabled={isInserting}
            {...register("email", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="National ID" error={errors?.nationalId?.message}>
          <Input
            type="text"
            id="nationalId"
            disabled={isInserting}
            {...register("nationalId", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="Country" error={errors?.country?.message}>
          <Input
            type="text"
            id="country"
            disabled={isInserting}
            {...register("country", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="Flag Country" error={errors?.flagCountry?.message}>
          <Input
            type="text"
            id="flagCountry"
            disabled={isInserting}
            {...register("flagCountry", { required: "This field is required" })}
          />
        </FormRow>
      </Section>

      <Section>
        <SectionTitle>Reservation Details</SectionTitle>
        <FormRow label="Start Date" error={errors?.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            min={today}
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
            {availableCabins.map((cabin) => (
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
        {hasBreakfast && (
          <FormRow label="Breakfast Price">
            <Input
              type="number"
              id="breakfastPrice"
              value={settings.breakfastPrice * (numGuests || 0)}
              disabled
            />
          </FormRow>
        )}
        <FormRow label="Total Price">
          <Input type="number" id="totalPrice" value={totalPrice} disabled />
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
        <FormRow label="Status" error={errors?.status?.message}>
          <Input
            type="text"
            id="status"
            disabled={isCreating}
            {...register("status")}
          />
        </FormRow>
      </Section>

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
