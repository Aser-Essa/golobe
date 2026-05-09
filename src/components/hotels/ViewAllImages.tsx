import type { Tables } from "#/lib/types/supabase";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";

type ViewAllImagesProps = {
  hotel_images: Tables<"hotel_images">[];
};

export default function ViewAllImages({ hotel_images }: ViewAllImagesProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute right-4 bottom-4 z-10 h-12 px-4 py-2 font-semibold hover:bg-[#a4dbc9]">
            View all photos
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] max-w-screen!">
          <div className="grid max-h-[90vh] w-full grid-cols-2 gap-2 overflow-y-scroll rounded-[12px]">
            {hotel_images.map((image) => (
              <div key={image.id}>
                <div className="h-full max-h-[500px] w-full overflow-hidden rounded-sm">
                  <img
                    src={image.url}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
