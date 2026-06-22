import { Plus } from "lucide-react";
import DashedBorder from "../common/DashedBorder";

export default function AddCardButton() {
  return (
    <div className="hover:bg-primary/10 relative h-full w-full cursor-pointer rounded-[16px]">
      <DashedBorder />
      <div className="relative flex h-full items-center gap-2 p-2.5">
        <div className="flex w-8 items-center justify-center rounded-full">
          <Plus size={24} className="text-primary" />
        </div>
        <p className="text-foreground/75 text-sm font-medium">Add a new card</p>
      </div>
    </div>
  );
}
