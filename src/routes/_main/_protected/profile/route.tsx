import RouteNotFound from "#/components/common/RouteNotFound";
import RouteError from "#/components/common/RouteError";
import Container from "#/components/layout/Container";
import ProfileBanner from "#/components/profile/banner-management/ProfileBanner";
import ProfileHeader from "#/components/profile/ProfileHeader";
import ProfileNavigation from "#/components/profile/profileNavigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_protected/profile")({
  component: RouteComponent,
  notFoundComponent: () => <RouteNotFound className="  min-h-fit py-20" />,
  errorComponent: ({ error, reset }) => (
    <RouteError error={error} reset={reset} />
  ),
});

function RouteComponent() {
  return (
    <Container>
      <ProfileBanner />
      <div className="-translate-y-17.5">
        <ProfileHeader />
        <ProfileNavigation />
        <div className="mt-10">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
