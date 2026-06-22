import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddCardButton from "./AddCardButton";
import AddCardElementsProvider from "./AddCardElementsProvider";

export default function AddCardDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-22 w-full">
          <AddCardButton />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <DialogTitle>Add a new card</DialogTitle>
            <DialogDescription>
              Add a new card to your account.
            </DialogDescription>
          </div>
        </div>
        <AddCardElementsProvider />
      </DialogContent>
    </Dialog>
  );
}
