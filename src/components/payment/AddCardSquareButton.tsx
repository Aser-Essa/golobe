import { Plus } from "lucide-react";
import DashedBorder from "../common/DashedBorder";

export default function AddCardSquareButton() {
  return (
    <div className="hover:bg-primary/10 relative h-53 w-full cursor-pointer rounded-[16px]">
      <DashedBorder />
      <div className="relative flex h-full flex-col items-center justify-center gap-2.5 p-2.5">
        <div className="border-primary flex aspect-square w-12 items-center justify-center rounded-full border-2">
          <Plus size={24} className="text-primary" />
        </div>
        <p className="text-foreground/75 text-sm font-medium">Add a new card</p>
      </div>
    </div>
  );
}
