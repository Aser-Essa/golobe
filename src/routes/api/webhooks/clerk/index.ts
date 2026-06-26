import { formatUserName, getFormattedUserJson } from "#/lib/utils/user";
import { getOrCreateStripeCustomerCore } from "#/server/stripe-core";
import { createUserDB, deleteUserDB, updateUserDB } from "#/server/user";
import { verifyWebhook } from "@clerk/tanstack-react-start/webhooks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/webhooks/clerk/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const evt = await verifyWebhook(request);

          const eventType = evt.type;

          if (eventType === "user.created") {
            const { fullName, email, avatar } = getFormattedUserJson(evt.data);

            const supabaseUser = {
              id: evt.data.id,
              full_name: fullName,
              email: email,
              phone: evt.data.phone_numbers.at(0)?.phone_number || null,
              avatar_url: avatar,
              is_active: !evt.data.locked,
            };

             await createUserDB({ user: supabaseUser });

            console.log( evt.data, "XXXXXXXXXXXX");

            const userName = formatUserName({
              firstName: evt.data.first_name,
              lastName: evt.data.last_name,
            });

            console.log(evt.data.id, "evt.data.id");

            // await getOrCreateStripeCustomerCore({
            //   userId: evt.data.id,
            //   name: userName,
            //   email: email,
            // });
          }

          if (eventType === "user.updated") {
            const { fullName, email, avatar } = getFormattedUserJson(evt.data);

            const supabaseUser = {
              id: evt.data.id,
              full_name: fullName,
              email: email,
              phone: evt.data.phone_numbers.at(0)?.phone_number || null,
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
