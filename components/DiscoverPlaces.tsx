import React from "react";
import { Button } from "./ui/button";
import DottedMap from "./DottedMap";
import DottedMapSVG from "./DottedMapSVG";
import Container from "./Container";

export default function DiscoverPlaces() {
  return (
    <>
      <div className="mt-1 space-y-6">
        <Container className="flex items-center justify-between">
          <div className="space-y-4">
            <p className="text-[32px] leading-10 font-semibold">
              Let&apos;s go places together
            </p>
            <p>
              Discover the latest offers and news and start planning your next
              trip with us.
            </p>
          </div>
          <Button className="border-mint-green text-blackish-green h-10 rounded-sm border-1 bg-transparent text-sm font-medium">
            See All
          </Button>
        </Container>
        <DottedMap>
          <DottedMapSVG />
        </DottedMap>
      </div>
    </>
  );
}
