import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertGuestDetails as insertGuestDetailsApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useInsertGuestDetails() {
  const queryClient = useQueryClient();

  const { mutateAsync: insertGuestDetails, isLoading: isInserting } =
    useMutation({
      mutationFn: insertGuestDetailsApi,
      onSuccess: (data) => {
        console.log(data, "eeeeeeeeeeli");
        toast.success(
          `Guest details for ${data.fullName} successfully created`
        );
        queryClient.invalidateQueries("guests");
      },
      onError: (error) => {
        console.error("Create booking error:", error);
        toast.error("There was an error while inserting the guest details");
      },
    });

  return { insertGuestDetails, isInserting };
}
