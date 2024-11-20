import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Hello World</h1>
          <Link href="/test-1">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Click me
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
