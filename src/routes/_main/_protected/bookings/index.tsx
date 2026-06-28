import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_protected/bookings/")({
  beforeLoad: () => {
    // throw redirect({ to: "/" });
  },
});
