import { createPaymentIntent } from "#/server/stripe";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { useCheckoutConfirm } from "./context/CheckoutConfirmContext";
import { toast } from "sonner";
import type {
  BookingPriceBreakdown,
  FilterSearchParams,
  paymentMode,
} from "#/lib/types";
import { useParams, useSearch } from "@tanstack/react-router";

export default function Checkout({
  selectedMethod,
  bookingPrice,
  paymentMode,
}: {
  selectedMethod: string;
  bookingPrice: BookingPriceBreakdown;
  paymentMode: paymentMode;
}) {
  const { confirmPaymentRef } = useCheckoutConfirm();
  const [isPending, startTransition] = useTransition();

  const { guests, checkIn, checkOut }: FilterSearchParams = useSearch({
    from: "/_main/hotels/$hotelId/checkout/$roomId/",
  });

  const { hotelId, roomId } = useParams({
    from: "/_main/hotels/$hotelId/checkout/$roomId/",
  });

  function handleCheckout() {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    startTransition(async () => {
      try {
        const res = await createPaymentIntent({
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

        if (!res.clientSecret) return;

        await confirmPaymentRef.current?.(res.clientSecret);
        
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
