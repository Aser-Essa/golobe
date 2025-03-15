"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

interface FloatingCard {
  top: number;
  left: number;
  image: string;
}

export default function DottedMap({ children }: { children: React.ReactNode }) {
  const lightedDots: number[] = [1007, 1491, 1224, 1749, 810];
  const [floatingCards, setFloatingCards] = useState<FloatingCard[]>([]);

  const cardData: Record<number, { image: string }> = {
    1: { image: "flyingCardImage_1.png" },
    2: { image: "flyingCardImage_2.png" },
    3: { image: "flyingCardImage_3.png" },
    4: { image: "flyingCardImage_4.png" },
    5: { image: "flyingCardImage_5.png" },
  };

  const updateCardsPositions = useCallback(() => {
    if (typeof window === "undefined") return;

    const Dots: SVGPathElement[] = lightedDots
      .map((dotNumber) =>
        document.querySelector<SVGPathElement>(`#Vector_${dotNumber}`),
      )
      .filter((dot): dot is SVGPathElement => dot !== null);

    Dots.forEach((Dot) => {
      Dot.setAttribute("opacity", "1");
    });

    const cardsData = Dots.map((Dot, idx) => {
      const rect = Dot.getBoundingClientRect();
      return {
        image: cardData[idx + 1]?.image || "default.png",
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };
    });

    setFloatingCards(cardsData);
  }, []);

  useEffect(() => {
    updateCardsPositions();
    window.addEventListener("resize", updateCardsPositions);

    return () => {
      window.removeEventListener("resize", updateCardsPositions);
    };
  }, [updateCardsPositions]);

  return (
    <div className="w-full">
      <div className="min-h-[500px]">{children}</div>

      {floatingCards.map((card, idx) => (
        <div
          key={`${card.top}-${card.left}-${idx}`}
          style={{
            position: "absolute",
            top: Math.round(card.top) - 52,
            left: Math.round(card.left) - 42,
          }}
          className="transition-all"
        >
          <div className="relative flex h-fit w-fit items-center gap-2 rounded bg-white p-1 text-nowrap shadow-lg md:h-12 md:w-24 md:pr-2 lg:w-35">
            <div className="relative h-8 w-8 md:h-10 md:w-10">
              <Image src={`/${card.image}`} fill alt="card" />
            </div>
            <div className="hidden overflow-hidden md:block">
              <p className="line-clamp-1 overflow-hidden text-[10px] font-bold">
                James Doe
              </p>
              <p className="line-clamp-1 overflow-hidden text-[8px]">
                Boarding Pass N’123
              </p>
            </div>
          </div>
          <div className="relative h-3 w-8 md:h-6 md:w-15">
            <Image
              src="/Arrow.png"
              fill
              alt="arrow"
              className="translate-x-1/2"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
