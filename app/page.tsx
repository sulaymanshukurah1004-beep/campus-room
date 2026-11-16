
"use client";

import { useState } from "react";
import { rooms } from "@/data/data";
import RoomCard from "@/components/RoomCard";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [building, setBuilding] = useState("All");
  const [capacity, setCapacity] = useState("All");

  const buildings = [
    "All",
    ...Array.from(new Set(rooms.map((room) => room.building))),
  ];

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesBuilding =
      building === "All" || room.building === building;

    const matchesCapacity =
      capacity === "All" ||
      (capacity === "Small" && room.capacity <= 10) ||
      (capacity === "Medium" &&
        room.capacity > 10 &&
        room.capacity <= 25) ||
      (capacity === "Large" && room.capacity > 25);

    return matchesSearch && matchesBuilding && matchesCapacity;
  });

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Find Your Perfect Campus Room
          </h1>

          <p className="text-gray-600 mt-3">
            Search, explore and book available rooms on campus.
          </p>
        </div>

        {/* Search and filters */}
        <div className="bg-white p-5 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search room name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            {buildings.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Buildings" : item}
              </option>
            ))}
          </select>

          <select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="All">All Capacities</option>
            <option value="Small">Small (1–10 people)</option>
            <option value="Medium">Medium (11–25 people)</option>
            <option value="Large">Large (26+ people)</option>
          </select>
        </div>

        {/* Room count */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Campus Rooms
          </h2>

          <p className="text-gray-500 mt-1">
            Showing {filteredRooms.length} room(s)
          </p>
        </div>

        {/* Room cards */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-10 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No rooms found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
