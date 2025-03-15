import { cn } from "@/lib/utils";
import React from "react";

type ContainerType = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ className, children }: ContainerType) {
  return (
    <>
      <div className={cn("px-6 sm:px-14 lg:px-26", className)}>{children}</div>
    </>
  );
}
