import type { Tables } from "#/lib/types/supabase";
import { getCoverImageUrl } from "#/lib/utils";
import ViewAllImages from "./ViewAllImages";

type HotelImagesProps = {
  hotel_images: Tables<"hotel_images">[];
};

export default function HotelImages({ hotel_images }: HotelImagesProps) {
  const coverImageUrl = getCoverImageUrl(hotel_images);

  const desktopImages = hotel_images
    .filter((image) => image.is_cover === false)
    .slice(0, 4);

  const mobileImages = hotel_images.slice(0, 4);

  return (
    <div className="relative grid min-h-[300px] w-full grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-[12px] lg:min-h-[550px] lg:grid-cols-4">
      <div className="col-span-2 row-span-2 hidden overflow-hidden lg:block">
        <img
          src={coverImageUrl}
          alt="cover-img"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {desktopImages.map((image) => (
        <div
          className="hidden overflow-hidden lg:block"
          key={`desktop-${image.id}`}
        >
          <img
            src={image.url}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      ))}

      {mobileImages.map((image) => (
        <div className="overflow-hidden lg:hidden" key={`mobile-${image.id}`}>
          <img
            src={image.url}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      ))}

      <ViewAllImages hotel_images={hotel_images} />
    </div>
  );
}
