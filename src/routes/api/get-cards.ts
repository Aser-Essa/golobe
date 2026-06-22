import { stripe } from "#/lib/stripe/stripe-server";
import { getUser } from "#/server/user";
import type { User } from "@clerk/tanstack-react-start/server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/get-cards")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);

        const user: User = await getUser();

        const customerId =
          (user.publicMetadata as any).stripeCustomerId ||
          url.searchParams.get("customerId");

        if (!customerId) {
          return Response.json(
            { error: "Missing customerId" },
            { status: 400 },
          );
        }

        const paymentMethods = await stripe.paymentMethods.list({
          customer: customerId,
          type: "card",
        });

        return Response.json({
          cards: paymentMethods.data,
        });
      },
    },
  },
});
