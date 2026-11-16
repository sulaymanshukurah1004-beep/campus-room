
"use client";

import Link from "next/link";
import { useBookings } from "./BookingContext";

type RoomCardProps = {
  room: {
    id: string;
    name: string;
    building: string;
    capacity: number;
    amenities: string[];
    image: string;
    availableSlots: string[];
  };
};

export default function RoomCard({ room }: RoomCardProps) {
  const { getBookedCount } = useBookings();

  const today = new Date().toISOString().split("T")[0];

  const isAvailable = room.availableSlots.some(
    (slot) => getBookedCount(room.id, today, slot) < 4
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-xl font-bold text-gray-800">
            {room.name}
          </h2>

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isAvailable ? "Available" : "Fully Booked"}
          </span>
        </div>

        <p className="text-gray-600 mt-3">
          Building: {room.building}
        </p>

        <p className="text-gray-600">
          Capacity: {room.capacity} people
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {room.amenities.join(" • ")}
        </p>

        <Link
          href={`/rooms/${room.id}`}
          className="block text-center bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
        >
          View Room
        </Link>
      </div>
    </div>
  );
}
