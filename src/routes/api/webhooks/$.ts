import { createUser } from "#/server/user";
import { verifyWebhook } from "@clerk/tanstack-react-start/webhooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/webhooks/$")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const evt = await verifyWebhook(request);

          // Do something with payload
          // For this guide, log payload to console

          const eventType = evt.type;

          console.log(evt.data);
          console.log(eventType);

          if (eventType === "user.created") {
            const user = {
              id: evt.data.id,
              full_name: evt.data.first_name + " " + evt.data.last_name,
              email: evt.data.email_addresses.at(0)?.email_address || null,
              phone: evt.data.phone_numbers.at(0)?.phone_number || null,
              avatar_url: evt.data.image_url || null,
              is_active: !evt.data.locked,
            };

            await createUser({ user });
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
