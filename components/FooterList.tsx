import React from "react";

type FooterListType = {
  title: string;
  items: string[];
};

export default function FooterList({ title, items }: FooterListType) {
  return (
    <>
      <div className="flex-1 space-y-4 text-nowrap">
        <p className="font-semibold">{title}</p>
        <ul className="space-y-3 text-sm font-medium text-[#112211b3]">
          {items.map((item) => (
            <li key={`${item} ${Math.random()}`}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
