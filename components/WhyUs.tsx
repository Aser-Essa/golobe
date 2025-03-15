import React from "react";
import WhyUsCard from "./WhyUsCard";

export default function WhyUs() {
  return (
    <div className="mx-26 mt-20">
      <div className="space-y-4">
        <p className="text-[32px] leading-10 font-semibold">
          Your Perfect Trip, Guaranteed!
        </p>
        <p>
          Enjoy a seamless travel experience with exclusive benefits and
          top-notch support.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(395px,1fr))] justify-center py-16">
        <WhyUsCard
          image={"shield.svg"}
          title={"Secure Booking"}
          subTitle={
            "Your payments and personal information are always protected"
          }
        />

        <WhyUsCard
          image={"clock.svg"}
          title={"24/7 Support"}
          subTitle={"Round-the-clock assistance for all your travel needs"}
        />

        <WhyUsCard
          image={"wallet.svg"}
          title={"Best Price Guarantee"}
          subTitle={"Find a lower price and we'll match it"}
        />
      </div>
    </div>
  );
}
