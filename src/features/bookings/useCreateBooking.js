import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingAPI } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingAPI,
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully created`);
      queryClient.invalidateQueries("bookings");
    },
    onError: (error) => {
      console.error("Create booking error:", error);
      toast.error("There was an error while creating the booking");
    },
  });

  return { createBooking, isCreating };
}
