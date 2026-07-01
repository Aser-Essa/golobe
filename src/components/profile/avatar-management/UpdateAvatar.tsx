import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { updateUserAvatar } from "#/server/user";
import { useUser } from "@clerk/tanstack-react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "#/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAvatarEditor } from "react-avatar-editor";
import AvatarEditorSection from "./AvatarEditorSection";
import PreviewAvatar from "./PreviewAvatar";

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
  const userAvatar =
    (user?.publicMetadata.originalAvatarUrl as string) || user?.imageUrl || "";

  const [image, setImage] = useState<string>("");
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [isLoding, setIsLoading] = useState(false);

  const editor = useAvatarEditor();

  async function handleSave() {
    if (!userId || !image) return;
    setIsLoading(true);
    await updateUserAvatar({ data: { dataUrl: image } });
    await user.reload();
    setIsLoading(false);
    toast.success("Avatar updated successfully");
    setIsOpen(false);
  }

  useEffect(() => {
    if (!userAvatar) return;
    const canvas = editor.ref.current?.getImage();
    const dataUrl = canvas?.toDataURL("image/png");
    if (!dataUrl) return;
    setImage(dataUrl);
  }, [userAvatar, scale, rotate, image]);

  return (
    <DialogContent className="w-[90vw] gap-10 sm:max-w-187.5 lg:w-187.5">
      <DialogHeader>
        <DialogTitle>Upload Avatar</DialogTitle>
        <DialogDescription>
          Choose an image to upload as your avatar.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-12 md:flex-row">
        <AvatarEditorSection
          userAvatar={userAvatar}
          editor={editor}
          setScale={setScale}
          scale={scale}
          setRotate={setRotate}
          rotate={rotate}
          setImage={setImage}
        />
        <div className="flex h-full w-full flex-col justify-between">
          <PreviewAvatar userAvatar={image || userAvatar} />
          <div className="flex items-center gap-3">
            <Button
              variant={"outline"}
              onClick={() => setIsChange(true)}
              className="h-10 flex-1"
            >
              Change Image
            </Button>
            <Button onClick={handleSave} className="h-10 flex-1">
              {isLoding ? (
                <>
                  <Loader2 className="animate-spin" /> saving...
                </>
              ) : (
                "Save Photo"
              )}
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
