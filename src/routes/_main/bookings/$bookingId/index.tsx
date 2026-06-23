import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/bookings/$bookingId/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return params;
  },
});

function RouteComponent() {
  const { bookingId } = Route.useLoaderData();

  return <div>Hello "/_main/bookings/$bookingId/"! {bookingId}</div>;
}
