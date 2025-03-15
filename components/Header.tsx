import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="text-blackish-green relative flex h-[90px] w-full items-center justify-between px-26 text-sm font-semibold">
      <ul className="flex h-full items-center gap-8">
        <li className="relative h-full">
          <Link href={"/"} className="flex h-full w-27 items-center gap-1">
            <Image
              src={"/airplane.svg"}
              width={22}
              height={20}
              alt="airplane icon"
            />
            Find Flight
          </Link>
          <div className="bg-mint-green absolute bottom-0 h-[5px] w-full"></div>
        </li>
        <li>
          <Link href={"/"} className="flex h-full w-27 items-center gap-1">
            <Image
              src={"/bed.svg"}
              width={21}
              height={17}
              alt="airplane icon"
            />
            Find Stays
          </Link>
        </li>
      </ul>
      <Link href={"/"} className="absolute top-1/2 left-1/2 -translate-1/2">
        <Image src={"/logo1.svg"} width={110} height={36} alt="Logo" />
      </Link>
      <div className="flex w-44.5 items-center justify-between">
        <Link href={"/"}>Login</Link>
        <Button className="bg-blackish-green h-12">Sign up</Button>
      </div>
    </div>
  );
}
