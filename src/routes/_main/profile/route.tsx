import Container from "#/components/layout/Container";
import ProfileBanner from "#/components/profile/ProfileBanner";
import ProfileHeader from "#/components/profile/ProfileHeader";
import ProfileNavigation from "#/components/profile/profileNavigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/profile")({
  component: RouteComponent,
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
