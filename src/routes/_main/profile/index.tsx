import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/profile/")({
  beforeLoad: () => {
    throw redirect({ to: "/profile/account" });
  },
});
