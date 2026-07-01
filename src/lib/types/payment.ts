import type Stripe from "stripe";
import type { createBookingType } from "./booking";

export type StripeCardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unionpay"
  | "cartes_bancaires"
  | "eftpos_au"
  | "interac"
  | "unknown";

export type paymentMode = "full" | "split";

export type stripeBookingMetadata = Omit<
  createBookingType,
  "BookingPriceBreakdown"
> & {
  userId: string;
  discount?: number;
  BookingPriceBreakdown: string;
};

export type PaymentCardType = {
  cards: Stripe.PaymentMethod[];
};

export type PricingParams = {
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
  taxRate: number;
  paymentMode: paymentMode;
};
