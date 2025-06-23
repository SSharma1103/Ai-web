"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full px-8 py-2 shadow-lg backdrop-blur-md bg-black border-b border-white max-md:px-4 max-md:py-1">
      <div className="flex gap-8 max-md:gap-4">
        <Link
          href="/"
          className={`text-lg font-medium transition-all duration-300 px-2 py-1 border-b-2
            ${
              pathname === "/"
                ? "text-white border-white"
                : "text-white/90 border-transparent hover:border-white"
            }`}
        >
          Home
        </Link>
        <Link
          href="/google"
          className={`text-lg font-medium transition-all duration-300 px-2 py-1 border-b-2
            ${
              pathname === "/comp"
                ? "text-white border-white"
                : "text-white/90 border-transparent hover:border-white"
            }`}
        >
          google
        </Link>
        <Link
          href="/llms"
          className={`text-lg font-medium transition-all duration-300 px-2 py-1 border-b-2
            ${
              pathname === "/comp"
                ? "text-white border-white"
                : "text-white/90 border-transparent hover:border-white"
            }`}
        >
          LLMs
        </Link>
        <Link
          href="/more"
          className={`text-lg font-medium transition-all duration-300 px-2 py-1 border-b-2
            ${
              pathname === "/comp"
                ? "text-white border-white"
                : "text-white/90 border-transparent hover:border-white"
            }`}
        >
          Workflows
        </Link>
      </div>
    </nav>
  );
}
