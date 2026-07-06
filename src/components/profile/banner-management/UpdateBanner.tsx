import { Button } from "#/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { updateUserBanner } from "#/server/user";
import { useUser } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { useAvatarEditor } from "react-avatar-editor";
import { toast } from "sonner";
import BannerEditorSection from "./BannerEditorSection";
import { Loader2 } from "lucide-react";
import DeleteBanner from "./DeleteBanner";
import { createServerSupabaseClient } from "#/lib/supabase";

type UpdateAvatarProps = {
  setIsChange: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
};

export default function UpdateAvatar({
  setIsChange,
  setIsOpen,
}: UpdateAvatarProps) {
  const { user } = useUser();
  const userId = user?.id;
  const userBanner =
    (user?.publicMetadata.originalBannerUrl as string) || "/user-banner.png";

  const isBannerExist = user?.publicMetadata.originalBannerUrl;

  const [image, setImage] = useState<string>("");
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [isLoding, setIsLoading] = useState(false);

  const editor = useAvatarEditor();

  async function handleSave() {
    if (!userId || !image) return;

    const supabase = createServerSupabaseClient();

    setIsLoading(true);

    const response = await fetch(image);
    const blob = await response.blob();

    const file = new File([blob], "cropped-banner.png", {
      type: "image/png",
    });

    const { error } = await supabase.storage
      .from("banners")
      .upload(`${userId}/${file.name}`, file, {
        upsert: true,
        cacheControl: "3600",
      });

    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }

    await updateUserBanner({
      data: {
        fileName: file.name,
      },
    });

    await user.reload();

    setIsLoading(false);
    toast.success("Banner updated successfully");
    setIsOpen(false);
  }

  useEffect(() => {
    if (!userBanner) return;
    const canvas = editor.ref.current?.getImageScaledToCanvas();
    const dataUrl = canvas?.toDataURL("image/png");
    if (!dataUrl) return;
    setImage(dataUrl);
  }, [userBanner, scale, rotate]);

  return (
    <DialogContent className="min-w-[90vw] gap-4">
      <DialogHeader className="gap-5!">
        <DialogTitle>Upload Banner</DialogTitle>
        <div className="relative">
          <DialogDescription>
            Choose an image to upload as your banner.
          </DialogDescription>
          <>{isBannerExist && <DeleteBanner />}</>
        </div>
      </DialogHeader>
      <div className="space-y-4">
        <BannerEditorSection
          userBanner={userBanner}
          editor={editor}
          setScale={setScale}
          scale={scale}
          setRotate={setRotate}
          rotate={rotate}
          setImage={setImage}
        />

        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            onClick={() => setIsChange(true)}
            className="h-10 flex-1"
          >
            Change Banner
          </Button>
          <Button onClick={handleSave} className="h-10 flex-1">
            {isLoding ? (
              <>
                <Loader2 className="animate-spin" /> saving...
              </>
            ) : (
              "Save Banner"
            )}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
