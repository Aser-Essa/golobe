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
          <Button className="hover:primary-80 absolute top-5 sm:top-auto right-5 z-50 flex h-12 items-center gap-2 p-4 sm:right-6.5 sm:bottom-6.5">
            <CloudUpload />
            <p>
              Upload <span className="hidden sm:inline-block">new banner</span>
            </p>
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
