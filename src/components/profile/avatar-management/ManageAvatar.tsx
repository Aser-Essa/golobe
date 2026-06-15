import { useUser } from "@clerk/tanstack-react-start";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import UpdateAvatar from "../UpdateAvatar";
import UploadAvatar from "./UploadAvatar";

export default function ManageAvatar() {
  const { user } = useUser();
  const hasImage = user?.hasImage;

  const [isChange, setIsChange] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="bg-salmon absolute right-0 bottom-0 z-50 flex aspect-square h-11 w-11 cursor-pointer items-center justify-center rounded-full">
            {hasImage && !isChange ? <Pencil /> : <Plus />}
          </button>
        </DialogTrigger>
        {hasImage && !isChange ? (
          <UpdateAvatar setIsChange={setIsChange} setIsOpen={setIsOpen} />
        ) : (
          <UploadAvatar setIsChange={setIsChange} />
        )}
      </Dialog>
    </>
  );
}
