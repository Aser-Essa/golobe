import Header from "#/components/main/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <div className="mx-20 mt-34">
        <Outlet />
      </div>
    </>
  );
}
