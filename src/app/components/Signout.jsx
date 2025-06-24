"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function UserDropdown() {
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

  if (!session) return null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
      >
        <img
          src={session.user.image}
          alt="User"
          className="w-6 h-6 rounded-full"
        />
        <span className="hidden md:inline">{session.user.name}</span>
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
  );
}
