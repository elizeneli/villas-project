import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  //query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], //this is like the dependency array of use effect hook, because it tells the react query to refetch the data from the filter everytime bookings its called
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-FETCHING

  const pageCount = Math.ceil(count);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], //this is like the dependency array of use effect hook, because it tells the react query to refetch the data from the filter everytime bookings its called
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], //this is like the dependency array of use effect hook, because it tells the react query to refetch the data from the filter everytime bookings its called
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, error, bookings, count };
}
