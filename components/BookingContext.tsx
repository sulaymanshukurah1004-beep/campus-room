
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Booking = {
  id: string;
  roomId: string;
  roomName: string;
  studentName: string;
  date: string;
  timeSlot: string;
  purpose: string;
};

type BookingContextType = {
  bookings: Booking[];
  getBookedCount: (
    roomId: string,
    date: string,
    timeSlot: string
  ) => number;
  addBooking: (
    booking: Omit<Booking, "id">
  ) => boolean;
  cancelBooking: (id: string) => void;
};

const BookingContext = createContext<
  BookingContextType | undefined
>(undefined);

export function BookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("campusBookings");

      if (saved) {
        setBookings(JSON.parse(saved));
      }
    } catch {
      console.error("Could not load bookings");
    }

    setLoaded(true);
  }, []);

  // Save bookings to localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "campusBookings",
        JSON.stringify(bookings)
      );
    }
  }, [bookings, loaded]);

  // Count bookings for a particular room, date and time
  const getBookedCount = (
    roomId: string,
    date: string,
    timeSlot: string
  ) => {
    return bookings.filter(
      (booking) =>
        booking.roomId === roomId &&
        booking.date === date &&
        booking.timeSlot === timeSlot
    ).length;
  };

  // Add a booking (maximum 4 students per slot)
  const addBooking = (
    booking: Omit<Booking, "id">
  ): boolean => {
    const count = getBookedCount(
      booking.roomId,
      booking.date,
      booking.timeSlot
    );

    if (count >= 4) {
      return false;
    }

    const newBooking: Booking = {
      ...booking,
      id: crypto.randomUUID(),
    };

    setBookings((previous) => [
      ...previous,
      newBooking,
    ]);

    return true;
  };

  // Cancel a booking
  const cancelBooking = (id: string) => {
    setBookings((previous) =>
      previous.filter((booking) => booking.id !== id)
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        getBookedCount,
        addBooking,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook
export function useBookings() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBookings must be used inside BookingProvider"
    );
  }

  return context;
}
