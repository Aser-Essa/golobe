import { formatUserName } from "#/lib/utils/user";
import { getOrCreateStripeCustomerCore } from "#/server/stripe-core";
import { createUserDB, deleteUserDB } from "#/server/user";
import { verifyWebhook } from "@clerk/tanstack-react-start/webhooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/webhooks/clerk/$")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const evt = await verifyWebhook(request);

          const eventType = evt.type;

          if (eventType === "user.created") {
            const supabaseUser = {
              id: evt.data.id,
              full_name: evt.data.first_name + " " + evt.data.last_name,
              email: evt.data.email_addresses.at(0)?.email_address || null,
              phone: evt.data.phone_numbers.at(0)?.phone_number || null,
              avatar_url: evt.data.image_url || null,
              is_active: !evt.data.locked,
            };

            await createUserDB({ user: supabaseUser });

            const userName = formatUserName({
              firstName: evt.data.first_name,
              lastName: evt.data.last_name,
            });

            await getOrCreateStripeCustomerCore({
              name: userName,
              email: evt.data.email_addresses.at(0)?.email_address || "",
              userId: evt.data.id,
            });
          }

          if (eventType === "user.deleted") {
            await deleteUserDB(String(evt.data.id));
          }

          return new Response("Webhook received", { status: 200 });
        } catch (err) {
          console.error("Error verifying webhook:", err);
          return new Response("Error verifying webhook", { status: 400 });
        }
      },
    },
  },
});
