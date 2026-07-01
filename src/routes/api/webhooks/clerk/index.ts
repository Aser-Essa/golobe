import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { formatUserName, getFormattedUserJson } from "#/lib/utils/user";
import { getOrCreateStripeCustomerCore } from "#/server/stripe-core";
import { createUserDB, deleteUserDB, updateUserDB } from "#/server/user/user";

export const Route = createFileRoute("/api/webhooks/clerk/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const evt = await verifyWebhook(request);

          const eventType = evt.type;

          if (eventType === "user.created") {
            const { fullName, email, avatar, phoneNumber } =
              getFormattedUserJson(evt.data);

            const supabaseUser = {
              id: evt.data.id,
              full_name: fullName,
              email: email,
              phone: phoneNumber,
              avatar_url: avatar,
              is_active: !evt.data.locked,
            };

            await createUserDB({ user: supabaseUser });

            const userName = formatUserName({
              firstName: evt.data.first_name,
              lastName: evt.data.last_name,
            });

            await getOrCreateStripeCustomerCore({
              name: userName,
              email: email,
              userId: evt.data.id,
            });
          }

          if (eventType === "user.updated") {
            const { fullName, email, avatar, phoneNumber } =
              getFormattedUserJson(evt.data);

            const supabaseUser = {
              id: evt.data.id,
              full_name: fullName,
              email: email,
              phone: phoneNumber,
              avatar_url: avatar,
              is_active: !evt.data.locked,
            };

            await updateUserDB({
              userId: evt.data.id,
              user: supabaseUser,
            });
          }

          if (eventType === "user.deleted") {
            await deleteUserDB(String(evt.data.id));
          }

          return new Response("Webhook received", { status: 200 });
        } catch (err) {
          console.error(err);

          if (err instanceof Error) {
            console.error(err.message);
            console.error(err.stack);
          }

          return new Response(
            err instanceof Error ? err.message : "Unknown error",
            {
              status: 400,
            },
          );
        }
      },
    },
  },
});
