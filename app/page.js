import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-bold">Premium Bus Transport</h1>
      <p>Book seats, track journeys, and print custom tickets.</p>
      <Link href="/booking">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Book a Trip
        </button>
      </Link>
    </div>
  );
}
