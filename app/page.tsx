import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-400 min-h-screen">
      <div className="navbar">
        <Navbar />
        </div>
        <div className="content flex flex-col items-center justify-center">
          <h1>Hello World</h1>
          <Link href="/test-1">
          <button>Click me</button>
          </Link>
        </div>
      
    </div>
  );
}
