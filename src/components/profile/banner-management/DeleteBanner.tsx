// import { deleteUserBanner } from "#/server/user";
import { useUser } from "@clerk/tanstack-react-start";
import { Loader2, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { deleteUserBanner } from "#/server/user";
import { useState } from "react";

export default function DeleteBanner() {
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleterBanner() {
    setIsDeleting(true);
    await deleteUserBanner();
    await user?.reload();
    setIsDeleting(false);
  }

  return (
    <Button
      variant={"link"}
      onClick={handleDeleterBanner}
      className="absolute top-1/2! right-0 -translate-y-1/2! bg-red-50 text-red-500"
    >
      {isDeleting ? (
        <>
          <Loader2 className="animate-spin" />
          <span>Deleting...</span>
        </>
      ) : (
        <>
          <Trash />
          <span>Delete Banner</span>
        </>
      )}
    </Button>
  );
}
