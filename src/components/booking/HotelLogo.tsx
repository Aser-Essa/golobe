import type { Booking } from "#/lib/types";

type HotelLogoProps = {
  hotelName: Booking["hotel"]["name"];
  logo_url: Booking["hotel"]["logo_url"];
};

export default function HotelLogo({ hotelName, logo_url }: HotelLogoProps) {
  const logoUrl =
    logo_url ||
    `https://ui-avatars.com/api/?name=${hotelName}&size=200&background=1a3c5e&color=fff&bold=true&format=png`;

  return (
    <>
      <div className="flex w-full items-center justify-center overflow-hidden rounded-[16px] border border-[#eaeaea] p-6 lg:p-8 lg:min-h-77.5 lg:w-fit xl:w-93.75">
        <img
          src={logoUrl}
          className="aspect-square size-20 rounded-[16px] lg:size-25 lg:min-w-25 xl:size-40 xl:min-w-40"
        />
      </div>
    </>
  );
}
