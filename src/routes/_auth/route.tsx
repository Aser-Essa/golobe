import Logo from "#/components/layout/Logo";
import { getAuthStatus } from "#/server/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    const { isAuthenticated } = await getAuthStatus();
    if (isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex justify-between gap-10 px-4 py-26 sm:px-8 md:px-16 lg:gap-16 xl:gap-26 xl:px-26">
      <div className="flex w-full flex-col justify-start">
        <div className="mb-16">
          <Logo />
        </div>
        <Outlet />
      </div>

      <div className="hidden w-full overflow-hidden rounded-[30px] min-[850px]:block">
        <img
          src="/auth-slider-1.png"
          alt="Auth Slider"
          className="h-full w-full object-cover lg:max-h-204"
        />
      </div>
    </div>
  );
}
