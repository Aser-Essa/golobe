import { Button } from "#/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "#/components/ui/drawer";
import { Separator } from "#/components/ui/separator";
import {
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
  useUser,
} from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { BedDouble, Heart, LogOut, Menu, User } from "lucide-react";

import Logo from "../Logo";

export function HeaderMobileMenu() {
  const { signOut } = useAuth();

  const { user } = useUser();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="flex h-full max-w-sm flex-col">
        <DrawerHeader className="border-b px-6 py-4">
          <Logo className="w-24" />
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <Show when={"signed-in"}>
            <div className="mb-6 flex items-center gap-3">
              <div className="aspect-square size-14 overflow-hidden rounded-full">
                <img
                  src={user?.imageUrl}
                  alt={user?.fullName || "profile"}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold">{user?.fullName}</p>

                <p className="text-muted-foreground text-sm">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>

            <Separator className="mb-4" />
          </Show>

          <nav className="space-y-2">
            <DrawerClose asChild>
              <Link
                to="/"
                className="hover:bg-muted flex items-center gap-3 rounded-xl px-4 py-3 transition-colors"
              >
                <BedDouble className="size-5" />
                <span className="font-medium">Find Stays</span>
              </Link>
            </DrawerClose>

            <Show when={"signed-in"}>
              <DrawerClose asChild>
                <Link
                  to="/favourites"
                  className="hover:bg-muted flex items-center gap-3 rounded-xl px-4 py-3 transition-colors"
                >
                  <Heart className="size-5" />
                  <span className="font-medium">Favourites</span>
                </Link>
              </DrawerClose>

              <DrawerClose asChild>
                <Link
                  to="/profile"
                  className="hover:bg-muted flex items-center gap-3 rounded-xl px-4 py-3 transition-colors"
                >
                  <User className="size-5" />
                  <span className="font-medium">Profile</span>
                </Link>
              </DrawerClose>
            </Show>
          </nav>
        </div>

        <div className="border-t p-6">
          <Show when={"signed-out"}>
            <div className="flex flex-col gap-3">
              <SignInButton>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button className="w-full">Get Started</Button>
              </SignUpButton>
            </div>
          </Show>

          <Show when={"signed-in"}>
            <Button
              variant="outline"
              className="w-full"
              onClick={async () => {
                await signOut();
              }}
            >
              <LogOut className="size-4" />
              Logout
            </Button>
          </Show>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
