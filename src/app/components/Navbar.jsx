import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 px-6 py-4 shadow flex gap-4">
      <Link href="/" className="text-white hover:underline">Home</Link>
      <Link href="/about" className="text-green-500 hover:underline">About</Link>
      <Link href="/comp" className="text-green-500 hover:underline">Comp</Link>
    </nav>
  )
}
