import type { Tables } from "#/lib/types/supabase";
import ViewAllImages from "../ViewAllImages";

type HotelImagesProps = {
  hotel_images: Tables<"hotel_images">[];
};

export default function HotelImages({ hotel_images }: HotelImagesProps) {
  const coverImg =
    hotel_images.find((image) => image.is_cover === true) || hotel_images[0];

  const coverImageUrl =
    coverImg.url ||
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800";

  const fourGridImages = hotel_images
    .filter((image) => image.is_cover === false)
    .slice(0, 4);

  return (
    <>
      <div className="relative grid min-h-[550px] w-full grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[12px]">
        <div className="col-span-2 row-span-2 overflow-hidden">
          <img
            src={coverImageUrl}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        {fourGridImages.map((image) => (
          <div className="overflow-hidden" key={image.id}>
            <img
              src={image.url}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}

        <ViewAllImages hotel_images={hotel_images} />
      </div>
    </>
  );
}
