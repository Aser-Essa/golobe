import RouteError from "#/components/common/RouteError";
import RouteNotFound from "#/components/common/RouteNotFound";
import { requireAuth } from "#/server/auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_protected")({
  component: ProtectedLayout,
  beforeLoad: async () => {
    await requireAuth();
  },
  notFoundComponent: () => <RouteNotFound  />,

  errorComponent: ({ error, reset }) => (
    <RouteError error={error} reset={reset} />
  ),
});

function ProtectedLayout() {
  return <Outlet />;
}
