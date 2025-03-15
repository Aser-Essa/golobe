import Image from "next/image";
import React from "react";
import FooterList from "./FooterList";
import Container from "./Container";

export default function Footer() {
  return (
    <>
      <Container className="bg-mint-green flex min-h-[422px] flex-col items-center gap-20 pt-54 pb-16 xl:flex-row xl:items-start xl:gap-35">
        <div className="w-fit space-y-6">
          <div className="relative h-10 w-30">
            <Image src={"/logo2.svg"} fill alt="logo" />
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={"/facebook.svg"}
              width={20}
              height={20}
              alt="facebook"
            />
            <Image src={"/twitter.svg"} width={22} height={22} alt="twitter" />
            <Image src={"/youtube.svg"} width={20} height={22} alt="youtube" />
            <Image
              src={"/instagram.svg"}
              width={18}
              height={18}
              alt="instagram"
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start justify-between gap-12">
          <FooterList
            title={"Our Destinations"}
            items={["Canada", "Alaksa", "France", "Iceland"]}
          />

          <FooterList
            title={"Our Activities"}
            items={[
              "Northern Lights",
              "Cruising & sailing",
              "Multi-activities",
              "Kayaing",
            ]}
          />

          <FooterList
            title={"Our Destinations"}
            items={["Canada", "Alaksa", "France", "Iceland"]}
          />

          <FooterList
            title={"Travel Blogs"}
            items={[
              "Bali Travel Guide",
              "Sri Lanks Travel Guide",
              "Peru Travel Guide",
              "Bali Travel Guide",
            ]}
          />

          <FooterList
            title={"About Us"}
            items={["Our Story", "Work with us"]}
          />

          <FooterList
            title={"Contact Us"}
            items={["Our Story", "Work with us"]}
          />
        </div>
      </Container>
    </>
  );
}
