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
import { setUserBannerMetadata } from "#/server/user";

export default function UploadBanner({
  setIsChange,
}: {
  setIsChange: (value: boolean) => void;
}) {
  const { user } = useUser();
  const userId = user?.id;

  const isBannerExist = user?.publicMetadata.originalBannerUrl;

  const props = useSupabaseUpload({
    bucketName: "banners",
    path: `${userId}`,
    allowedMimeTypes: ["image/*"],
    fixedFileName: "banner.png",
    maxFiles: 1,
    maxFileSize: 1000 * 1000 * 10,
    upsert: true,
    onUploadSuccess: async () => {
      await setUserBannerMetadata();
      await user?.reload();
      setIsChange(false);
    },
  });

  useEffect(() => {
    if (!props.loading && props.isSuccess) {
      setIsChange(false);
    }
  }, [props.isSuccess, props.loading]);

  return (
    <DialogContent className="w-[90vw] gap-10 sm:max-w-187.5 lg:w-187.5">
      <DialogHeader>
        <DialogTitle>Upload Banner</DialogTitle>
        <DialogDescription>
          Choose an image to upload as your banner.
        </DialogDescription>
      </DialogHeader>

      <div className="w-full">
        <Dropzone className="" {...props}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>

      {isBannerExist ? (
        <Button onClick={() => setIsChange(false)}>Cancel</Button>
      ) : (
        <DialogClose asChild>
          <Button
            onClick={() => setIsChange(false)}
            variant={"outline"}
            className="bg-primary/25"
          >
            Cancel
          </Button>
        </DialogClose>
      )}
    </DialogContent>
  );
}
