import type { HotelType } from "#/lib/types";
import { cn, getMinRoomPrice } from "#/lib/utils";

export default function HotelPrice({
  rooms,
  orientation,
}: {
  rooms: HotelType["rooms"];
  orientation?: "vertical" | "horizontal";
}) {
  const minPrice = getMinRoomPrice(rooms);

  return (
    <div className={cn("text-foreground/75 text-xs font-medium")}>
      {orientation === "horizontal" && (
        <p className="text-nowrap">starting from</p>
      )}
      <p
        className={cn(
          "text-salmon text-xl font-bold min-[800px]:text-2xl",
          orientation === "vertical" && "flex flex-col! text-xl!",
        )}
      >
        <span>${minPrice}</span>
        <span
          className={cn(
            "text-sm",
            orientation === "vertical" && "text-end! text-xs!",
          )}
        >
          /night
        </span>
      </p>
      {orientation === "horizontal" && <p className="text-end">excl. tax</p>}
    </div>
  );
}
