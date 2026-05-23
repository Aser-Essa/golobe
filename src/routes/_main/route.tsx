import Header from "#/components/layout/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
