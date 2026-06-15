import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { useSupabaseUpload } from "#/hooks/use-supabase-upload";
import { useUser } from "@clerk/tanstack-react-start";
import { useEffect } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "#/components/common/DropZone";
import { Button } from "#/components/ui/button";

export default function UploadAvatar({
  setIsChange,
}: {
  setIsChange: (value: boolean) => void;
}) {
  const { user } = useUser();
  const userId = user?.id;
  const hasImage = user?.hasImage;

  const props = useSupabaseUpload({
    bucketName: "avatars",
    path: `${userId}`,
    allowedMimeTypes: ["image/*"],
    maxFiles: 1,
    maxFileSize: 1000 * 1000 * 10,
    upsert: true,
  });

  useEffect(() => {
    if (!props.loading && props.isSuccess) {
      setIsChange(false);
    }
  }, [props.isSuccess, props.loading]);

  return (
    <DialogContent className="w-[90vw] gap-10 sm:max-w-187.5 lg:w-187.5">
      <DialogHeader>
        <DialogTitle>{hasImage ? "Edit" : "Upload"} Avatar</DialogTitle>
        <DialogDescription>
          Choose an image to upload as your avatar.
        </DialogDescription>
      </DialogHeader>

      <div className="w-full">
        <Dropzone className="" {...props}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>
      {hasImage ? (
        <Button onClick={() => setIsChange(false)}>Cancel</Button>
      ) : (
        <DialogClose asChild>
          <Button onClick={() => setIsChange(false)} variant={"outline"} className=" bg-primary/25">
            Cancel
          </Button>
        </DialogClose>
      )}
    </DialogContent>
  );
}
