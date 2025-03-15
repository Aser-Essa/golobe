import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Container from "./Container";

export default function Header() {
  return (
    <Container className="text-blackish-green relative flex h-[90px] w-full items-center justify-between text-sm font-semibold">
      <ul className="flex h-full items-center gap-4 sm:gap-8">
        <li className="relative h-full">
          <Link
            href={"/"}
            className="flex h-full items-center gap-1 px-1.5 md:px-0"
          >
            <Image
              src={"/airplane.svg"}
              width={22}
              height={20}
              alt="airplane icon"
            />
            <p className="hidden md:block">Find Flight</p>
          </Link>
          <div className="bg-mint-green absolute bottom-0 h-[5px] w-full"></div>
        </li>
        <li>
          <Link href={"/"} className="flex h-full items-center gap-1">
            <Image
              src={"/bed.svg"}
              width={21}
              height={17}
              alt="airplane icon"
            />
            <p className="hidden md:block">Find Stays</p>
          </Link>
        </li>
      </ul>
      <Link
        href={"/"}
        className="md:absolute md:top-1/2 md:left-1/2 md:-translate-1/2"
      >
        <div className="relative h-8 w-20 md:h-9 md:w-27.5">
          <Image src={"/logo1.svg"} fill alt="Logo" />
        </div>
      </Link>
      <div className="flex w-fit items-center justify-between space-x-1.5 md:w-44.5 md:space-x-3">
        <Link href={"/"}>Login</Link>
        <Button className="bg-blackish-green h-fit max-sm:px-3 sm:h-12">
          Sign up
        </Button>
      </div>
    </Container>
  );
}
