
"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { rooms } from "@/data/data";
import { useBookings } from "@/components/BookingContext";

function RoomDetailsContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getBookedCount } = useBookings();

  const room = rooms.find((item) => item.id === params.id);

  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [selectedSlot, setSelectedSlot] = useState("");

  if (!room) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h1 className="text-2xl font-bold">Room not found</h1>
        <Link href="/" className="text-blue-600 underline mt-4 block">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    router.push(
      `/booking?roomId=${room.id}&date=${date}&timeSlot=${encodeURIComponent(selectedSlot)}`
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Rooms
        </Link>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden mt-6">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {room.name}
            </h1>

            <p className="text-gray-600 mt-2">
              Building: {room.building}
            </p>

            <p className="text-gray-600">
              Capacity: {room.capacity} people
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              Amenities
            </h2>

            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              Choose a Date
            </h2>

            <input
              type="date"
              value={date}
              min={new Date().toLocaleDateString("en-CA")}
              onChange={(e) => {
                setDate(e.target.value);
                setSelectedSlot("");
              }}
              className="border rounded-lg p-3 w-full"
            />

            <h2 className="text-xl font-semibold mt-6 mb-3">
              Available Time Slots
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {room.availableSlots.map((slot) => {
                const booked = getBookedCount(room.id, date, slot);
                const seatsLeft = Math.max(0, 4 - booked);
                const isFull = seatsLeft === 0;

                return (
                  <button
                    key={slot}
                    disabled={isFull}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-lg border font-medium ${
                      isFull
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedSlot === slot
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                    }`}
                  >
                    <span className="block">{slot}</span>
                    <span className="text-xs">
                      {isFull ? "Fully booked" : `${seatsLeft} seats left`}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              Proceed to Booking
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RoomDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center">
          Loading room details...
        </div>
      }
    >
      <RoomDetailsContent />
    </Suspense>
  );
}
