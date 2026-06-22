import { deleteUserAvatar } from "#/server/user";
import { useUser } from "@clerk/tanstack-react-start";
import { Trash } from "lucide-react";
import { Button } from "../../ui/button";

export default function DeleteAvatar() {
  const { user } = useUser();

  async function handleDeleteAvatar() {
    await deleteUserAvatar();
    await user?.reload();
  }

  return (
    <Button variant={"link"} onClick={handleDeleteAvatar}>
      <Trash />
      <span>Delete current Image</span>
    </Button>
  );
}
