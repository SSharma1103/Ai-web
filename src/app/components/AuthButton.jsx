"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session } = useSession()

  return session ? (
    <div className="flex items-center gap-4">
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded">
        Sign out
      </button>
    </div>
  ) : (
    <button onClick={() => signIn("google")} className="px-4 py-2 bg-blue-500 text-white rounded">
      Sign in with Google
    </button>
  )
}
