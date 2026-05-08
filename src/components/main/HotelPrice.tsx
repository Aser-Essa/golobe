export default function HotelPrice({ rooms }: { rooms: any[] }) {
  const prices = rooms.map((room) => room.price_per_night);
  const minPrice = Math.min(...prices);

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
