import {
  Waves,
  WavesLadder,
  Sparkles,
  Dumbbell,
  Utensils,
  Wine,
  Coffee,
  Bell,
  Wifi,
  Croissant,
  ParkingCircle,
  Bus,
  Ban,
  Monitor,
  AirVent,
} from "lucide-react";
import type { FilterSearchParams } from "../types";
import {
  VisaIcon,
  MastercardIcon,
  AmexIcon,
  DiscoverIcon,
  DinersIcon,
  JcbIcon,
  UnionpayIcon,
} from "react-svg-credit-card-payment-icons";

export const amenityIcons = {
  // wellness
  "pool-outdoor": Waves,
  "pool-indoor": WavesLadder,
  spa: Sparkles,
  fitness: Dumbbell,
  "fitness-room": Dumbbell,

  // dining
  restaurant: Utensils,
  bar: Wine,
  coffee: Coffee,
  "room-service": Bell,

  // connectivity
  wifi: Wifi,

  // freebies
  breakfast: Croissant,
  parking: ParkingCircle,
  shuttle: Bus,
  cancel: Ban,

  // services
  "desk-24": Monitor,

  // room
  ac: AirVent,
} as const;

export const HOTELS_PER_PAGE = 4;

export const MAX_ROOMS = 10;
export const MAX_GUESTS = MAX_ROOMS * 3;

export const MAX_DESTINATION_OPTIONS = 6;

export const HOTEL_TYPES: {
  value: FilterSearchParams["hotelType"];
  label: string;
}[] = [
  { value: "hotel", label: "Hotels" },
  { value: "motel", label: "Motels" },
  { value: "resort", label: "Resorts" },
];

export const FAVOURITE_TYPES: {
  value: FilterSearchParams["favType"];
  label: string;
}[] = [
  {
    value: "hotel",
    label: "Hotels",
  },
  {
    value: "flight",
    label: "Flights",
  },
];

export const FALLBACK_IMAGE = "/dummy-hotel-img.png";

export const SERVICE_FEE = 10;

export const SupabaseStorageAvatarPath =
  "https://zypocyviadephfsrsucv.supabase.co/storage/v1/object/public/avatars";

export const SupabaseStorageBannerPath =
  "https://zypocyviadephfsrsucv.supabase.co/storage/v1/object/public/banners";

export const YOUR_DOMAIN = "http://localhost:3000/";

export const cardBrandIcons = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  amex: AmexIcon,
  discover: DiscoverIcon,
  diners: DinersIcon,
  jcb: JcbIcon,
  unionpay: UnionpayIcon,
};

export const paymentTerms = [
  "If you are purchasing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes.",
  "If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is declined for any reason or if you have supplied incorrect card information. If we become aware of, or is notified of, any fraud or illegal activity associated with the payment for the booking, the booking will be cancelled and you will be liable for all costs and expenses arising from such cancellation, without prejudice to any action that may be taken against us.",
  "Golobe may require the card holder to provide additional payment verification upon request by either submitting an online form or visiting the nearest Golobe office, or at the airport at the time of check-in. Golobe reserves the right to deny boarding or to collect a guarantee payment (in cash or from another credit card) if the card originally used for the purchase cannot be presented by the cardholder at check-in or when collecting the tickets, or in the case the original payment has been withheld or disputed by the card issuing bank. Credit card details are held in a secured environment and transferred through an internationally accepted system.",
];

export const contactUsDetails = [
  "Golobe Group Q.C.S.C",
  "Golobe Tower",
  "P.O. Box: 22550",
  "Doha, State of Qatar",
  "Further contact details can be found at golobe.com/help",
];

export const footerLinks = [
  {
    title: "Our Destinations",
    links: [
      { label: "Canada", href: "/hotels?destination=Canada" },
      { label: "Alaska", href: "/hotels?destination=Alaska" },
      { label: "France", href: "/hotels?destination=France" },
      { label: "Iceland", href: "/hotels?destination=Iceland" },
    ],
  },
  {
    title: "Travel Blogs",
    links: [
      { label: "Bali Travel Guide", href: "#" },
      { label: "Sri Lanka Travel Guide", href: "#" },
      { label: "Peru Travel Guide", href: "#" },
      { label: "Bali Travel Guide", href: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Work with Us", href: "#" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { label: "Contact Support", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
];
