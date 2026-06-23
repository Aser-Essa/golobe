import type {
  BookingPriceBreakdown,
  HotelType,
  paymentMode,
} from "#/lib/types";
import { getCoverImageUrl } from "#/lib/utils";
import Checkout from "../payment/Checkout";
import { Separator } from "../ui/separator";

interface CheckoutSummarySidebarProps {
  hotel: HotelType;
  room: HotelType["rooms"][number];
  selectedMethod: string;
  paymentMode: paymentMode;
  bookingPrice: BookingPriceBreakdown;
}

export default function CheckoutSummarySidebar({
  hotel,
  room,
  selectedMethod,
  paymentMode,
  bookingPrice,
}: CheckoutSummarySidebarProps) {
  const coverImage = getCoverImageUrl(hotel.hotel_images);

  const { restToPay, amountToPay, baseFare, taxes, serviceFee } = bookingPrice;

  return (
    <div className="box-shadow-sm top-30 w-full space-y-4 rounded-[12px] bg-white p-4 sm:p-6 lg:sticky lg:flex-2">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="aspect-video w-full min-w-13 overflow-hidden rounded-[12px] sm:aspect-square sm:size-13">
          <img
            src={coverImage}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-foreground line-clamp-1 text-base font-medium text-ellipsis">
            {hotel.name}{" "}
          </p>
          <p className="mt-1 line-clamp-1 font-bold text-ellipsis xl:text-xl">
            {room.name} - {room.bed_type}
          </p>
        </div>
      </div>
      <Separator />
      <p className="text-base font-medium">
        Your booking is protected by <span className="font-bold">golobe</span>
      </p>
      <Separator />
      <div className="space-y-4">
        <p className="text-base font-bold">Price Details</p>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <p className="text-base font-medium">Base Fare</p>
            <p className="text-base font-semibold">${baseFare}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-base font-medium">Taxes</p>
            <p className="text-base font-semibold">${taxes}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-base font-medium">Service Fee</p>
            <p className="text-base font-semibold">${serviceFee}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-base font-medium">Payment Mode</p>
            <p className="text-base font-semibold capitalize">{paymentMode}</p>
          </li>

          {restToPay > 0 && (
            <li className="flex items-center justify-between">
              <p className="text-base font-medium">Rest of Payment</p>
              <p className="text-base font-semibold capitalize">{restToPay}</p>
            </li>
          )}
        </ul>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">Total</p>
        <p className="text-base font-semibold">${amountToPay}</p>
      </div>
      <Separator />

      <Checkout
        selectedMethod={selectedMethod}
        paymentMode={paymentMode}
        bookingPrice={bookingPrice}
      />
    </div>
  );
}
