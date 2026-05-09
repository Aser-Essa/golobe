import Logo from "#/components/layout/Logo";
import { checkAuthFn } from "#/server/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { isAuthenticated } = await checkAuthFn();
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <div className="flex justify-between gap-26 p-26">
        <div className="flex w-full flex-col justify-start">
          <div className="mb-16">
            <Logo />
          </div>
          <Outlet />
        </div>

        <div className="w-full overflow-hidden rounded-[30px]">
          <img
            src="/auth-slider-1.png"
            alt="Auth Slider"
            className="max-h-204 w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
