import { useUser } from "@clerk/tanstack-react-start";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import UploadAvatar from "./UploadAvatar";
import UpdateAvatar from "./UpdateAvatar";

export default function ManageAvatar() {
  const { user } = useUser();
  const hasImage =
    (user?.publicMetadata.originalAvatarUrl as string) || user?.hasImage;

  const [isChange, setIsChange] = useState(false);
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
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange} key={sessionKey}>
        <DialogTrigger asChild>
          <button className="bg-salmon absolute right-0 bottom-0 z-50 flex aspect-square h-11 w-11 cursor-pointer items-center justify-center rounded-full">
            {hasImage ? <Pencil /> : <Plus />}
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
