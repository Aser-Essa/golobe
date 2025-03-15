import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Container from "./Container";

export default function Subscripe() {
  return (
    <Container>
      <div className="relative top-38 -mt-10 rounded-[20px] bg-[#CDEAE1] px-6">
        <div className="flex justify-between gap-15">
          <div className="flex flex-col justify-between py-6">
            <p className="text-blackish-green w-1/2 text-[44px] leading-13.5 font-semibold">
              Subscribe Newsletter
            </p>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <p className="text-xl font-medium text-[#374A3B]">The Travel</p>
                <p className="font-medium text-[#495E4F]">
                  Get inspired! Receive travel discounts, tips and behind the
                  scenes stories.
                </p>
              </div>
              <div className="flex h-14 gap-4">
                <input
                  placeholder="Your email address"
                  className="h-full w-full rounded border-none bg-white p-4 text-[#1C1B1F] outline-none placeholder:text-[#1C1B1F]"
                />
                <Button className="bg-blackish-green h-full rounded text-sm font-medium">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="relative h-[305px] w-100">
            <Image src={"/mail.svg"} fill alt="mail" />
          </div>
        </div>
      </div>
    </Container>
  );
}
