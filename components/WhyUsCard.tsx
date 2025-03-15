import Image from "next/image";
import React from "react";

type WhyUsCardType = {
  image: string;
  title: string;
  subTitle: string;
};

export default function WhyUsCard({ image, title, subTitle }: WhyUsCardType) {
  return (
    <>
      <div className="flex flex-col items-center justify-start px-8 py-6 text-center 2xl:not-last:border-r-2 2xl:first:pl-0 2xl:last:pr-0">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C4E9DD]">
          <Image src={`/${image}`} width={24} height={24} alt="shileld" />
        </div>
        <p className="mb-3 text-xl font-bold">{title}</p>
        <p className="text-[#4B5563]">{subTitle}</p>
      </div>
    </>
  );
}
