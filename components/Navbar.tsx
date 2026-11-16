
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-700">
        CampusRooms
      </Link>

      <div className="flex gap-6">
        <Link href="/" className="text-gray-700 hover:text-blue-700">
          Home
        </Link>

        <Link
          href="/my-bookings"
          className="text-gray-700 hover:text-blue-700"
        >
          My Bookings
        </Link>
      </div>
    </nav>
  );
}
