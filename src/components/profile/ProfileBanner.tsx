import { CloudUpload } from "lucide-react";
import { Button } from "../ui/button";

export default function ProfileBanner() {
  return (
    <div className="relative h-87.5 w-full overflow-hidden rounded-[12px]">
      <img src="/user-conver-img.png" className="h-full w-full object-cover" />
      <Button className="hover:primary-80 absolute right-6.5 bottom-6.5 z-50 flex h-12 items-center gap-2 p-4">
        <CloudUpload />
        <p>Upload new cover</p>
      </Button>
    </div>
  );
}
