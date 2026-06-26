import { stripe } from "#/lib/stripe/stripe-server";
import type { stripeBookingMetadata } from "#/lib/types";
import { formatBookingData } from "#/lib/utils";
import { insertBookingIntoDB } from "#/server/bookings";
import { createFileRoute } from "@tanstack/react-router";
import type Stripe from "stripe";

export const Route = createFileRoute("/api/webhooks/stripe/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.text();

        const signature = request.headers.get("Stripe-Signature");

        if (!signature)
          return Response.json({ error: "Missing signature" }, { status: 400 });

        let event: Stripe.Event;

        try {
          event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
          );
        } catch (err) {
          console.error("Error verifying webhook:", err);
          return new Response("Error verifying webhook", { status: 400 });
        }

        if (event.type === "payment_intent.succeeded") {
          const formattedBookingData = formatBookingData(
            event.data.object.metadata as unknown as stripeBookingMetadata,
          );

          await insertBookingIntoDB({
            bookingData: {
              ...formattedBookingData,
              payment_intent_id: event.data.object.id,
            },
          });
        }

        return Response.json({ received: true }, { status: 200 });
      },
    },
  },
});
