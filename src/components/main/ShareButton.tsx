import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function ShareButton() {
  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }

  return (
    <>
      <Button
        onClick={handleShare}
        className="aspect-square size-12 h-full bg-transparent"
        variant={"outline"}
      >
        <Share2 className="size-5 text-[#4C4850]" />
      </Button>
    </>
  );
}
