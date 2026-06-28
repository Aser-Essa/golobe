import { requireAuth } from "#/server/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_protected")({
  component: ProtectedLayout,
  beforeLoad: async () => {
    await requireAuth();
  },
});

function ProtectedLayout() {
  return <Outlet />;
}
