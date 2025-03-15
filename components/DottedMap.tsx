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
      {children}

      {floatingCards.map((card, idx) => (
        <div
          key={`${card.top}-${card.left}-${idx}`}
          style={{
            position: "absolute",
            top: Math.round(card.top) - 75,
            left: Math.round(card.left) - 80,
          }}
          className="transition-all"
        >
          <div className="relative flex h-12 w-35 items-center gap-2 rounded bg-white p-1 pr-2 text-nowrap shadow-lg">
            <Image src={`/${card.image}`} width={40} height={40} alt="card" />
            <div>
              <p className="text-[10px] font-bold">James Doe</p>
              <p className="text-[8px]">Boarding Pass N’123</p>
            </div>
          </div>
          <Image
            src="/Arrow.png"
            width={60}
            height={28}
            alt="arrow"
            className="translate-x-1/2"
          />
        </div>
      ))}
    </div>
  );
}
