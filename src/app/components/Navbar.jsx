"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = (path) =>
    `text-lg font-medium transition-all duration-300 px-2 py-1 border-b-2 ${
      pathname === path
        ? "text-white border-white"
        : "text-white/90 border-transparent hover:border-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full px-8 py-2 shadow-lg backdrop-blur-md bg-black border-b border-white max-md:px-4 max-md:py-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-8 max-md:gap-4">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/google" className={linkClass("/google")}>
            Google
          </Link>
          <Link href="/llms" className={linkClass("/llms")}>
            LLMs
          </Link>
          <Link href="/more" className={linkClass("/more")}>
            Workflows
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Contact me
          </Link>
        </div>

        {session && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
            >
              <img
                src={session.user.image}
                alt="User"
                className="w-6 h-6 rounded-full"
              />
              <span className="hidden sm:inline">{session.user.name}</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-800 text-white rounded-lg shadow-lg border border-white/20 backdrop-blur-sm z-50">
                <div className="px-4 py-3 text-sm border-b border-white/10">
                  <p className="font-medium">{session.user.name}</p>
                  <p className="text-white/60 truncate">{session.user.email}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full text-left px-4 py-2 hover:bg-zinc-700 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
