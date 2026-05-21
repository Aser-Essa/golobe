import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/bookings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/bookings/"!</div>;
}
