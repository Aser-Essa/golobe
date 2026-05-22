import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import type { HotelType } from "#/lib/types";
import { formatDate } from "date-fns";
import {
  Bed,
  CalendarPlus,
  CheckCircle,
  Eye,
  Mountain,
  Users,
  XCircle,
} from "lucide-react";

type ViewRoomDetailsProps = {
  room: HotelType["rooms"][0];
};

export default function ViewRoomDetails({ room }: ViewRoomDetailsProps) {
  const metaGrid = [
    {
      icon: Users,
      label: "Max guests",
      value: `${room.max_guests} guests`,
    },
    { icon: Bed, label: "Bed type", value: room.bed_type ?? "—" },
    { icon: Eye, label: "View", value: room.view_type ?? "—" },
    {
      icon: CalendarPlus,
      label: "Added",
      value: formatDate(new Date(room.created_at), "MMM d, yyyy"),
    },
  ];

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="h-12 w-37.5 px-4 py-2 font-semibold"
            variant={"outline"}
          >
            View details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          {room.image_url ? (
            <img
              src={room.image_url || "/"}
              alt={room.name}
              className="h-44 w-full object-cover"
            />
          ) : (
            <div className="bg-muted flex h-36 w-full items-center justify-center">
              <Bed className="text-muted-foreground/40 size-10" />
            </div>
          )}

          <div className="pt-4 pb-0">
            <DialogHeader>
              <div className="mb-2 flex flex-wrap gap-1.5">
                <Badge className="gap-1 text-xs">
                  {room.is_available ? (
                    <>
                      <CheckCircle className="size-3" /> Available
                    </>
                  ) : (
                    <>
                      <XCircle className="size-3" /> Unavailable
                    </>
                  )}
                </Badge>
                {room.bed_type && (
                  <Badge className="gap-1 text-xs">
                    <Bed className="size-3" />
                    {room.bed_type}
                  </Badge>
                )}
                {room.view_type && (
                  <Badge className="gap-1 text-xs">
                    <Mountain className="size-3" />
                    {room.view_type}
                  </Badge>
                )}
              </div>

              <DialogTitle className="text-base">{room.name}</DialogTitle>

              {room.description && (
                <DialogDescription className="text-sm leading-relaxed">
                  {room.description}
                </DialogDescription>
              )}
            </DialogHeader>

            <hr className="border-border my-4" />

            <div className="grid grid-cols-2 gap-2">
              {metaGrid.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-muted/60 rounded-lg px-3 py-2.5">
                  <p className="text-muted-foreground mb-0.5 flex items-center gap-1 text-[11px]">
                    <Icon className="size-3" />
                    {label}
                  </p>
                  <p className="text-foreground text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-foreground text-2xl font-semibold">
                ${Number(room.price_per_night).toFixed(2)}
              </span>
              <span className="text-muted-foreground text-sm">/ night</span>
            </div>
          </div>

          <DialogFooter className="border-border mt-5 flex gap-2 border-t px-5 py-4">
            <DialogClose asChild>
              <Button variant="outline" className="h-10 flex-1">
                Close
              </Button>
            </DialogClose>
            {room.is_available && (
              <Button className="h-10 flex-2 gap-2">
                <CalendarPlus className="size-4" />
                Book this room
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
