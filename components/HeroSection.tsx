import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <div className="text-neutrals relative h-134 w-full px-26 pt-20">
      <Image
        src={"/heroSectionBg.png"}
        fill
        alt="herosection background"
        className="z-[-1] object-cover"
      />
      <div className="space-y-2">
        <p className="z-400 max-w-110 text-[45px] font-semibold">
          Make your travel whishlist, we’ll do the rest
        </p>
        <p className="text-xl font-medium">Special offers to suit your plan</p>
      </div>
    </div>
  );
}
