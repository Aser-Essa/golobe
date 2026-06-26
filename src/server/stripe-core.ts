"use server";

import { stripe } from "#/lib/stripe/stripe-server";
import { clerkClient } from "@clerk/tanstack-react-start/server";

export async function getOrCreateStripeCustomerCore({
  userId,
  email,
  name,
}: {
  userId: string;
  email: string;
  name: string;
}) {
  const { privateMetadata } = await clerkClient().users.getUser(userId);

  const customerId = privateMetadata.stripeCustomerId as string;

  if (customerId) return customerId;

  const customer = await stripe.customers.create({ email, name });

  await clerkClient().users.updateUserMetadata(userId, {
    privateMetadata: { stripeCustomerId: customer.id },
  });

  return customer.id;
}
