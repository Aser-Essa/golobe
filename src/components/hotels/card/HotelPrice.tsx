import type { HotelType } from "#/lib/types";
import { getMinRoomPrice } from "#/lib/utils";

export default function HotelPrice({ rooms }: { rooms: HotelType["rooms"] }) {
  const minPrice = getMinRoomPrice(rooms);

  return (
    <div className="text-foreground/75 text-xs font-medium">
      <p>starting from</p>
      <p className="text-salmon text-xl font-bold min-[800px]:text-2xl">
        ${minPrice}
        <span className="text-sm">/night</span>
      </p>
      <p className="text-end">excl. tax</p>
    </div>
  );
}
