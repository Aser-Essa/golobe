import { Link } from "@tanstack/react-router";
import { BedDouble, Heart } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import {
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
  useUser,
} from "@clerk/tanstack-react-start";
import { formatUserName } from "#/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function Header() {
  const { signOut } = useAuth();

  const { user, isLoaded } = useUser();

  const userName = formatUserName({
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  const avatar = user?.imageUrl;

  return (
    <header className="box-shadow-sm fixed top-0 left-0 z-2000 flex h-22 w-full items-center justify-between bg-white/50 px-26 py-5 backdrop-blur-md">
      <nav>
        <Link to="/" className="relative flex items-center gap-1">
          <BedDouble />
          <p className="text-sm font-semibold">Find Stays</p>
        </Link>
      </nav>
      <Logo />

      <button
        onClick={async () => await signOut().then(() => {})}
        className="border-primary hover:bg-primary/15 flex h-14 cursor-pointer items-center justify-center rounded-sm border transition-all"
      >
        Logout
      </button>
      <Show when={"signed-out"}>
        <div className="flex items-center gap-4">
          <SignInButton>
            <Button variant={"outline"} className="p-4.5">
              Login
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className="p-4.5">Get Started</Button>
          </SignUpButton>
        </div>
      </Show>

      <Show when={"signed-in"}>
        <div className="flex items-center gap-4">
          <Link to="/favorites" className="relative flex items-center gap-1">
            <Heart fill="#000" />
            <p className="text-sm font-semibold">Favorites</p>
          </Link>

          <div className="h-4.5 w-0.5 bg-black"></div>

          {isLoaded ? (
            <Link to="/profile" className="relative flex items-center gap-1">
              <div className="aspect-square h-11 w-11 overflow-hidden rounded-full">
                <img
                  src={avatar}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm font-semibold">{userName}</p>
            </Link>
          ) : (
            <div className="relative flex items-center gap-1">
              <div className="aspect-square h-11 w-11 overflow-hidden rounded-full">
                <Skeleton className="h-full w-full" />
              </div>
              <Skeleton className="h-4 w-15" />
            </div>
          )}
        </div>
      </Show>
    </header>
  );
}
