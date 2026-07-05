import RouteError from "#/components/common/RouteError";
import RouteNotFound from "#/components/common/RouteNotFound";
import Footer from "#/components/layout/Footer";
import Header from "#/components/layout/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
  notFoundComponent: () => <RouteNotFound />,
  errorComponent: ({ error, reset }) => (
    <RouteError error={error} reset={reset} />
  ),
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
