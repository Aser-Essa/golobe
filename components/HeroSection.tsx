import Image from "next/image";
import React from "react";
import Container from "./Container";

export default function HeroSection() {
  return (
    <>
      <Container className="text-neutrals relative flex h-134 w-full items-center py-20 sm:block">
        <Image
          src={"/heroSectionBg.png"}
          fill
          alt="herosection background"
          className="z-[-1] object-cover"
          quality={100}
          priority
        />
        <div className="space-y-2">
          <p className="z-400 max-w-110 text-4xl font-semibold sm:text-[45px]">
            Make your travel whishlist, we’ll do the rest
          </p>
          <p className="text-lg font-medium sm:text-xl">
            Special offers to suit your plan
          </p>
        </div>
      </Container>
    </>
  );
}
