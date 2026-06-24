import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/payment/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
