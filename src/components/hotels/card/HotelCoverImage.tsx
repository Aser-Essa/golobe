import type { Tables } from "#/lib/types/supabase";
import { getCoverImageUrl } from "#/lib/utils";

type HotelCoverImageProps = {
  hotel_images: Tables<"hotel_images">[];
};

export default function HotelCoverImage({
  hotel_images,
}: HotelCoverImageProps) {
  const coverImageUrl = getCoverImageUrl(hotel_images);

  return (
    <div className="relative min-w-60 flex-1">
      <div className="h-full w-full overflow-hidden max-h-74 md:max-h-none">
        <img
          src={coverImageUrl}
          className="h-full w-full md:object-cover object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="absolute top-2 right-2 flex h-8 items-center justify-center rounded-[8px] bg-white/50 px-2 py-1 text-xs font-medium backdrop-blur-xs">
        {hotel_images.length} images
      </div>
    </div>
  );
}
