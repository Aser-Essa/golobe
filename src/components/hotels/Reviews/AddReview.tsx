import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import type { HotelType } from "#/lib/types";
import { useState } from "react";
import { Separator } from "../../ui/separator";
import AddReviewForm from "./AddReviewForm";

type AddReviewProps = {
  hotelId: HotelType["id"];
  bookingId: string;
};

export default function AddReview({ hotelId, bookingId }: AddReviewProps) {
  const [_, setIsChange] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    setIsChange(false);
    if (open) {
      setSessionKey((prev) => prev + 1);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} key={sessionKey}>
      <DialogTrigger asChild>
        <Button className="h-10 px-4 font-semibold hover:bg-[#a4dbc9] md:h-12">
          Give your review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-[17px] font-medium tracking-tight">
            Add your review
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-[13px] leading-relaxed">
            Your feedback helps other travelers make better decisions.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <AddReviewForm
          bookingId={bookingId}
          hotelId={hotelId}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
