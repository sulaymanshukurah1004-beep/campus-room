
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { rooms } from "@/data/data";
import { useBookings } from "@/components/BookingContext";
import { useState } from "react";

export default function RoomDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { getBookedCount } = useBookings();

  const room = rooms.find(
    (item) => item.id === params.id
  );

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Room not found</h1>
        <Link href="/" className="text-blue-600 mt-4">
          Back to rooms
        </Link>
      </div>
    );
  }

  const bookedCount =
    date && timeSlot
      ? getBookedCount(room.id, date, timeSlot)
      : 0;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        <Link href="/" className="text-blue-600 font-medium">
          ← Back to Rooms
        </Link>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden mt-6">

          <img
            src={room.image}
            alt={room.name}
            className="w-full h-80 object-cover"
          />

          <div className="p-8">

            <h1 className="text-3xl font-bold text-gray-900">
              {room.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {room.building}
            </p>

            <p className="mt-4 text-gray-700">
              Capacity: {room.capacity} people
            </p>

            <h2 className="text-xl font-semibold mt-6">
              Room Amenities
            </h2>

            <div className="flex flex-wrap gap-2 mt-3">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-8">
              Check Availability
            </h2>

            <div className="mt-4">
              <label className="block font-medium mb-2">
                Select Date
              </label>

              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTimeSlot("");
                }}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="mt-5">
              <label className="block font-medium mb-2">
                Available Time Slots
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {room.availableSlots.map((slot) => {
                  const count = date
                    ? getBookedCount(room.id, date, slot)
                    : 0;

                  const full = count >= 4;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!date || full}
                      onClick={() => setTimeSlot(slot)}
                      className={`p-3 rounded-lg border ${
                        timeSlot === slot
                          ? "bg-blue-600 text-white"
                          : full
                          ? "bg-red-100 text-red-500"
                          : "bg-white hover:bg-blue-50"
                      }`}
                    >
                      {slot}
                      <span className="block text-xs mt-1">
                        {full
                          ? "Fully booked"
                          : `${4 - count} seats left`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              disabled={!date || !timeSlot}
              onClick={() =>
                router.push(
                  `/booking?roomId=${room.id}&date=${date}&timeSlot=${encodeURIComponent(timeSlot)}`
                )
              }
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-8 font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              Proceed to Booking
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
