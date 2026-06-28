import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_protected/payment/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
