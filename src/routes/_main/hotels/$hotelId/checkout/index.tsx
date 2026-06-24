import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/hotels/$hotelId/checkout/")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/hotels/$hotelId",
      params: {
        hotelId: params.hotelId,
      },
    });
  },
});
