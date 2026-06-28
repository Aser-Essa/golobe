import BookingSummaryCards from "#/components/booking/BookingSummaryCards";
import { TabFilter } from "#/components/common/TabFilter";
import { BookingSummaryCardsSkeleton } from "#/components/skeleton/BookingSummaryCardsSkeleton";
import { getUserBookings } from "#/server/bookings";
import {
  Await,
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute(
  "/_main/_protected/profile/tickets-bookings/",
)({
  component: RouteComponent,
  validateSearch: z.object({
    bookingType: z.enum(["stays", "flights"]).default("stays"),
  }),
  loader: async () => {
    const bookingsPromise = getUserBookings();
    return { bookingsPromise };
  },
});

function RouteComponent() {
  const { bookingsPromise } = Route.useLoaderData();

  const navigate = useNavigate({ from: "/profile/tickets-bookings/" });

  const { bookingType } = useSearch({
    from: "/_main/_protected/profile/tickets-bookings/",
  });

  return (
    <div className="space-y-4">
      <h3 className="text-[28px] font-bold sm:text-[32px]">Tickets/Bookings</h3>
      <TabFilter
        defaultValue={bookingType}
        onValueChange={(value) =>
          navigate({
            to: `/profile/tickets-bookings/?bookingType=${value}`,
            resetScroll: false,
          })
        }
        options={[
          { value: "stays", label: "Stays" },
          { value: "flights", label: "Flights", disabled: true },
        ]}
      />

      <Await
        promise={bookingsPromise}
        fallback={<BookingSummaryCardsSkeleton />}
      >
        {(bookings) => <BookingSummaryCards bookings={bookings} />}
      </Await>
    </div>
  );
}
