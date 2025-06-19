"use client";

import Link from "next/link";
import * as motion from "motion/react-client";
import { useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import AuthButton from "./AuthButton";// Assuming you have an AuthButton component

export default function Chart() {
  const constraintsRef = useRef(null);
  const { data: session } = useSession();

  return (
    <motion.div
      ref={constraintsRef}
      className="w-screen h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center relative overflow-hidden"
    >
      {/* Glass-like Draggable Box (Doubled Size) */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        className="w-80 h-80 rounded-2xl flex flex-col items-center justify-center text-white cursor-grab
                  backdrop-blur-lg bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.36)]
                  relative overflow-hidden px-6 py-8"
        whileDrag={{
          cursor: "grabbing",
          scale: 1.05,
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)",
        }}
        whileHover={{
          scale: 1.03,
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Glass reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl pointer-events-none" />

        {/* Main AI+ text */}
        <motion.span
          className="text-6xl font-extrabold drop-shadow-md text-white/90"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          AI+
        </motion.span>

        {/* Subtitle text */}
        <motion.span
          className="text-sm font-medium mt-4 text-center text-white/70 tracking-widest uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          For Custom AI Agents
        </motion.span>
      </motion.div>

      {/* Conditional Button based on Auth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {session ? (
          <Link
            href="/comp"
            className="absolute bottom-8 right-8 px-6 py-3 rounded-xl text-white font-medium backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 group"
          >
            Take a Demo
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group-hover:translate-x-1 transition-transform"
            >
              →
            </motion.span>
          </Link>
        ) : (
          <AuthButton/>
        )}
      </motion.div>

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-900/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-900/20 blur-3xl"></div>
      </div>
    </motion.div>
  );
}
