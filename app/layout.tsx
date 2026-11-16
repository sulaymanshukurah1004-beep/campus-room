
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BookingProvider } from "@/components/BookingContext";

export const metadata: Metadata = {
  title: "Campus Room Booking",
  description: "Book campus rooms easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BookingProvider>
          <Navbar />
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
