import Container from "#/components/layout/Container";
import { checkBookingExist } from "#/server/bookings";
import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_main/payment/pending/")({
  component: RouteComponent,
  validateSearch: z.object({
    payment_intent: z.string().optional(),
  }),
  beforeLoad: async ({ search }) => {
    const { userId } = await auth();

    if (!userId) {
      throw redirect({ to: "/" });
    }

    if (!search.payment_intent) {
      throw redirect({ to: "/" });
    }
  },
});
function RouteComponent() {
  const { payment_intent } = Route.useSearch();

  const navigate = useNavigate({ from: "/payment/pending/" });

  const countRef = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (countRef.current >= 15) {
        toast.error(
          "Your booking is not confirmed yet. Please try again later or contact support.",
        );
        navigate({
          to: "/",
          replace: true,
        });
      }
      countRef.current++;
      const { exist, bookingId } = await checkBookingExist({
        data: { payment_intent_id: payment_intent! },
      });

      if (exist) {
        navigate({
          to: "/bookings/$bookingId",
          params: { bookingId: bookingId },
          replace: true,
        });
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Container className="flex min-h-[70vh] items-center justify-center">
        <div className="bg-card w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
          <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <ShieldCheck className="size-8" />
          </div>

          <h1 className="text-2xl font-semibold">Processing your booking</h1>

          <p className="text-muted-foreground mt-3">
            Your payment was received successfully. We're now confirming your
            reservation and preparing your booking details.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Loader2 className="size-5 animate-spin" />
            <span className="text-muted-foreground text-sm">
              This usually takes a few seconds...
            </span>
          </div>

          <div className="bg-muted/40 text-muted-foreground mt-8 rounded-xl border p-4 text-sm">
            Please don't close this page. You will be redirected automatically
            once your booking is ready.
          </div>
        </div>
      </Container>
    </>
  );
}
