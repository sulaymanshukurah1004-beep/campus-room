
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/BookingContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CampusRooms",
  description: "Find, explore and book available campus rooms.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
