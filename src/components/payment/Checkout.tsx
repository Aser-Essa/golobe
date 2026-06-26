import type {
  BookingPriceBreakdown,
  FilterSearchParams,
  HotelType,
  paymentMode,
} from "#/lib/types";
import { hasBookedDayInRange } from "#/lib/utils";
import { createPaymentIntent } from "#/server/stripe";
import { useParams, useSearch } from "@tanstack/react-router";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useCheckoutConfirm } from "./context/CheckoutConfirmContext";

export default function Checkout({
  selectedMethod,
  bookingPrice,
  paymentMode,
  room,
}: {
  selectedMethod: string;
  bookingPrice: BookingPriceBreakdown;
  paymentMode: paymentMode;
  room: HotelType["rooms"][number];
}) {
  const { confirmPaymentRef } = useCheckoutConfirm();
  const [isPending, startTransition] = useTransition();

  const { guests, checkIn, checkOut }: FilterSearchParams = useSearch({
    from: "/_main/hotels/$hotelId/checkout/$roomId/",
  });
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const { hotelId, roomId } = useParams({
    from: "/_main/hotels/$hotelId/checkout/$roomId/",
  });

  function handleCheckout() {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (hasBookedDayInRange(checkInDate, checkOutDate, room.bookings)) {
      toast.error("These dates are no longer available.");
      return;
    }

    startTransition(async () => {
      try {
        const { clientSecret } = await createPaymentIntent({
          data: {
            roomId,
            hotelId,
            guests,
            checkIn,
            checkOut,
            BookingPriceBreakdown: bookingPrice,
            paymentMode,
            paymentMethodId:
              selectedMethod !== "other" ? selectedMethod : undefined,
          },
        });

        if (!clientSecret) return;

        await confirmPaymentRef.current?.({ clientSecret });
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <Button className="h-12 w-full" onClick={handleCheckout}>
      {isPending ? "Checking out..." : "Checkout"}
    </Button>
  );
}
