
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Booking = {
  id: string;
  roomId: string;
  roomName: string;
  studentName: string;
  purpose: string;
  date: string;
  timeSlot: string;
};

type BookingContextType = {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id">) => void;
  cancelBooking: (id: string) => void;
  getBookedCount: (
    roomId: string,
    date: string,
    timeSlot: string
  ) => number;
};

const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved bookings from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem("campus-bookings");

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    setLoaded(true);
  }, []);

  // Save bookings whenever they change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("campus-bookings", JSON.stringify(bookings));
    }
  }, [bookings, loaded]);

  // Add a new booking
  const addBooking = (booking: Omit<Booking, "id">) => {
    setBookings((previous) => [
      ...previous,
      {
        ...booking,
        id: crypto.randomUUID(),
      },
    ]);
  };

  // Cancel a booking
  const cancelBooking = (id: string) => {
    setBookings((previous) =>
      previous.filter((booking) => booking.id !== id)
    );
  };

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

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        cancelBooking,
        getBookedCount,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook for using booking information
export function useBookings() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookings must be used inside BookingProvider");
  }

  return context;
}
