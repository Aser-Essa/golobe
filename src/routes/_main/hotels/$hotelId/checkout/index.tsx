import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hotels/$hotelId/checkout/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
