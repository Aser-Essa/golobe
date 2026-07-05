import { Button } from "#/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";
import { Separator } from "#/components/ui/separator";
import { Skeleton } from "#/components/ui/skeleton";
import { getFormattedUser } from "#/lib/utils/user";
import { SignOutButton, useUser } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";
import { ChevronRight, CreditCard, Info, LogOut, User } from "lucide-react";

export default function HeaderUserMenu() {
  const { user, isLoaded } = useUser();

  const { avatar, userName, fullName } = getFormattedUser(user, isLoaded);

  return (
    <>
      {isLoaded ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="relative flex items-center gap-1 px-0 text-black no-underline!"
              variant={"link"}
            >
              <div className="aspect-square size-9 overflow-hidden rounded-full sm:size-11">
                <img
                  src={avatar}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="hidden text-sm font-semibold sm:block">
                {userName}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="mt-3 w-70 gap-4 p-4">
            <div className="relative flex items-center justify-start gap-4 p-0 text-start text-black no-underline!">
              <div className="aspect-square size-10 overflow-hidden rounded-full sm:size-12">
                <img
                  src={avatar}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{fullName}.</p>
                <p className="text-foreground/75 text-xs">Online</p>
              </div>
            </div>
            <Separator />
            <ul className="space-y-2 text-sm font-medium">
              <li className="hover:bg-foreground/5 rounded-[4px] transition-all">
                <Link
                  viewTransition
                  to="/profile/account"
                  className="flex items-center justify-between gap-3 py-1"
                >
                  <span className="flex items-center gap-2">
                    <User className="size-4 fill-black" /> <p>My account</p>
                  </span>
                  <ChevronRight className="size-4" />
                </Link>
              </li>

              <li className="hover:bg-foreground/5 rounded-[4px] transition-all">
                <Link
                  viewTransition
                  to="/profile/payment-methods"
                  className="flex items-center justify-between gap-3 py-1"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="size-4" />
                    <p>Payments</p>
                  </span>
                  <ChevronRight className="size-4" />
                </Link>
              </li>
            </ul>
            <Separator />
            <ul className="space-y-2 text-sm font-medium">
              <li className="hover:bg-foreground/5 rounded-[4px] transition-all">
                <Link
                  viewTransition
                  to="/profile"
                  className="flex items-center justify-between gap-3 py-1"
                >
                  <span className="flex items-center gap-2">
                    <Info className="size-4" />
                    <p>Support</p>
                  </span>
                  <ChevronRight className="size-4" />
                </Link>
              </li>

              <li className="hover:bg-foreground/5 clear-both cursor-pointer rounded-[4px] py-1 transition-all">
                <SignOutButton>
                  <span className="flex items-center gap-2">
                    <LogOut className="size-4" />
                    <p>Logout</p>
                  </span>
                </SignOutButton>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="relative flex items-center gap-1">
          <div className="aspect-square h-11 w-11 overflow-hidden rounded-full">
            <Skeleton className="h-full w-full" />
          </div>
          <Skeleton className="h-4 w-15" />
        </div>
      )}
    </>
  );
}
