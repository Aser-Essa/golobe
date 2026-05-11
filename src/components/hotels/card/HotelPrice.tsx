import type { HotelType } from "#/lib/types";

export default function HotelPrice({ rooms }: { rooms: HotelType["rooms"] }) {
  const prices = rooms.map((room) => room.price_per_night);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  return (
    <>
      <div className="text-foreground/75 text-xs font-medium">
        <p>starting from</p>
        <p className="text-salmon text-2xl font-bold">
          ${minPrice}
          <span className="text-sm">/night</span>
        </p>
        <p className="text-end">excl. tax</p>
      </div>
    </>
  );
}
