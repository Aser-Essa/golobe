import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Subscripe from "@/components/Subscripe";

const MontserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Golobe",
  description: "Flight Booking Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${MontserratSans.className} overflow-x-hidden bg-[#FAFBFC] antialiased`}
      >
        <Header />
        {children}
        <Subscripe />
        <Footer />
      </body>
    </html>
  );
}
