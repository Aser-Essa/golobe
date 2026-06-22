import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import type { User } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { stripe } from "#/lib/stripe/stripe-server";
import z from "zod";
import { getUser } from "./user";

export const getOrCreateStripeCustomer = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string(),
      name: z.string(),
    }),
  )
  .handler(async ({ data: { email, name } }) => {
    const { userId } = await auth();

    const { publicMetadata } = await clerkClient().users.getUser(userId!);
    const customerId = publicMetadata.stripeCustomerId as string;

    if (customerId) return customerId;

    const customer = await stripe.customers.create({
      email,
      name,
    });

    await clerkClient().users.updateUserMetadata(userId!, {
      publicMetadata: { stripeCustomerId: customer.id },
    });

    return customer.id;
  });

export const createSetupIntent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ paymentMethodType: z.enum(["card", "other"]) }))
  .handler(async ({ data: { paymentMethodType } }) => {
    try {
      const user: User = await getUser();

      const stripeCustomerId = (user.publicMetadata as any).stripeCustomerId;

      if (!stripeCustomerId) throw new Error("No stripe customer id");

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
  .inputValidator(
    z.object({
      amount: z.number(),
      paymentMethodId: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const user: User = await getUser();

    const stripeCustomerId = (user.publicMetadata as any).stripeCustomerId;

    if (!stripeCustomerId) throw new Error("No customer");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount * 100,
      currency: "usd",
      customer: stripeCustomerId,

      ...(data.paymentMethodId
        ? {
            payment_method: data.paymentMethodId,
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
  });

export const getCards = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const user: User = await getUser();

    const stripeCustomerId = (user.publicMetadata as any).stripeCustomerId;

    if (!stripeCustomerId) throw new Error("No stripe customer id");

    const paymentMethods = await stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: "card",
    });

    console.log(paymentMethods);

    return { cards: JSON.parse(JSON.stringify(paymentMethods.data)) };
  } catch (err: any) {
    return { cards: [] };
  }
});
