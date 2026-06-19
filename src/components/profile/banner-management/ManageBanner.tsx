import { Button } from "#/components/ui/button";
import { CloudUpload } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import UpdateBanner from "./UpdateBanner";
import UploadBanner from "./UploadBanner";

export default function ManageBanner() {
  const [isChange, setIsChange] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="hover:primary-80 absolute right-6.5 bottom-6.5 z-50 flex h-12 items-center gap-2 p-4">
            <CloudUpload />
            <p>Upload new cover</p>
          </Button>
        </DialogTrigger>
        {isChange ? (
          <UploadBanner setIsChange={setIsChange} />
        ) : (
          <UpdateBanner setIsChange={setIsChange} setIsOpen={setIsOpen} />
        )}
      </Dialog>
    </>
  );
}
