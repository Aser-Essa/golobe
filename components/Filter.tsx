import React, { Suspense } from "react";

import FilterRow from "./FilterRow";
import { Button } from "./ui/button";
import { Plus, Send } from "lucide-react";

export default function Filter() {
  return (
    <>
      <div
        className="bg-neutrals relative top-[-76px] mx-26 space-y-8 rounded-2xl px-6 pt-8 pb-12"
        style={{ boxShadow: "0 4px 16px #8dd3ba26" }}
      >
        <p className="text-xl font-semibold">Where are you flying? </p>
        <Suspense fallback={<p>Loading...</p>}>
          <FilterRow />
        </Suspense>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-nowrap sm:justify-end">
          <p className="flex cursor-pointer items-center gap-1 text-sm font-medium">
            <Plus className="h-4 w-4" /> Add Promo Code
          </p>
          <Button className="bg-mint-green text-blackish-green flex h-12 items-center gap-1 rounded-md px-4 py-2">
            <Send />
            Show Filghts
          </Button>
        </div>
      </div>
    </>
  );
}
