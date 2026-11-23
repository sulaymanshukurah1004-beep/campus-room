
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { BookingProvider } from "@/components/BookingContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CampusRooms",
  description: "Book your perfect campus room.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
