import { stripe } from "#/lib/stripe/stripe-server";
import { getUser } from "#/server/user";
import type { User } from "@clerk/tanstack-react-start/server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/create-setup-intent")({
  server: {
    handlers: {
      POST: async () => {
        try {
          const user: User = await getUser();

          const setupIntent = await stripe.setupIntents.create({
            customer: (user.publicMetadata as any).stripeCustomerId,
          });

          return Response.json({
            clientSecret: setupIntent.client_secret,
            customerId: (user.publicMetadata as any).stripeCustomerId,
          });
        } catch (err: any) {
          return Response.json({ error: err.message }, { status: 500 });
        }
      },
    },
  },
});
