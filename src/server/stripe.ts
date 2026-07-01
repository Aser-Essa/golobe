import { createBookingSchema } from "#/lib/schemas";
import { stripe } from "#/lib/stripe/stripe-server";
import { getFormattedUser } from "#/lib/utils/user";
import { authFnMiddleware } from "#/middlewares/auth";
import type { User } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { getOrCreateStripeCustomerCore } from "./stripe-core";
import { getUser } from "./user";

export const getOrCreateStripeCustomer = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(
    z.object({
      email: z.email(),
      name: z.string(),
    }),
  )
  .handler(async ({ data: { email, name }, context: { userId } }) => {
    return getOrCreateStripeCustomerCore({ userId: userId, email, name });
  });

export const createSetupIntent = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(z.object({ paymentMethodType: z.enum(["card", "other"]) }))
  .handler(async ({ data: { paymentMethodType } }) => {
    try {
      const user: User = await getUser();

      let stripeCustomerId = await (user.privateMetadata as any)
        .stripeCustomerId;

      const { fullName, email } = getFormattedUser(user, !!user.id);

      if (!stripeCustomerId) {
        stripeCustomerId = await getOrCreateStripeCustomer({
          data: {
            email: email || user.emailAddresses.at(0)?.emailAddress || "",
            name: fullName,
          },
        });
      }

      const cardMethod = {
        payment_method_types: ["card"],
      };

      const setupIntent = await stripe.setupIntents.create({
        customer: stripeCustomerId,
        ...(paymentMethodType === "card"
          ? cardMethod
          : {
              automatic_payment_methods: { enabled: true },
              excluded_payment_method_types: ["card"],
            }),
      });

      return {
        clientSecret: setupIntent.client_secret,
        customerId: stripeCustomerId,
      };
    } catch (err: any) {
      return { error: err.message };
    }
  });

export const createPaymentIntent = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(createBookingSchema)
  .handler(
    async ({
      data: {
        roomId,
        hotelId,
        guests,
        BookingPriceBreakdown,
        paymentMode,
        paymentMethodId,
        checkIn,
        checkOut,
      },
    }) => {
      const user: User = await getUser();
      const { email, fullName } = getFormattedUser(user, !!user.id);

      let stripeCustomerId = (user.privateMetadata as any).stripeCustomerId;

      if (!stripeCustomerId) {
        stripeCustomerId = await getOrCreateStripeCustomer({
          data: {
            email: email || user.emailAddresses.at(0)?.emailAddress || "",
            name: fullName,
          },
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: BookingPriceBreakdown.amountToPay * 100,
        currency: "usd",
        customer: stripeCustomerId,
        metadata: {
          userId: user.id,
          roomId,
          hotelId,
          guests,
          checkIn,
          checkOut,
          BookingPriceBreakdown: JSON.stringify(BookingPriceBreakdown),
          paymentMode,
          discount: 0,
        },
        ...(paymentMethodId
          ? {
              payment_method: paymentMethodId,
              payment_method_types: ["card"],
            }
          : {
              automatic_payment_methods: {
                enabled: true,
              },
            }),
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    },
  );

export const getCards = createServerFn({ method: "GET" })
  .middleware([authFnMiddleware])
  .handler(async () => {
    try {
      const user: User = await getUser();

      const stripeCustomerId = (user.privateMetadata as any).stripeCustomerId;

      if (!stripeCustomerId) throw new Error("No stripe customer id");

      const paymentMethods = await stripe.paymentMethods.list({
        customer: stripeCustomerId,
        type: "card",
      });

      return { cards: JSON.parse(JSON.stringify(paymentMethods.data)) };
    } catch (err: any) {
      return { cards: [] };
    }
  });

export const deletePaymentMethod = createServerFn({ method: "POST" })
  .middleware([authFnMiddleware])
  .inputValidator(z.object({ paymentMethodId: z.string() }))
  .handler(async ({ data }) => {
    try {
      const user: User = await getUser();

      const stripeCustomerId = (user.privateMetadata as any).stripeCustomerId;

      if (!stripeCustomerId) throw new Error("No stripe customer id");

      await stripe.paymentMethods.detach(data.paymentMethodId);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });
