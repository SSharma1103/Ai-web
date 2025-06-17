import Chart from "./components/Chart"
import Navbar from "./components/Navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <Navbar />
      <h1 className="text-4xl font-bold mb-6">AI Dashboard</h1>
      <Chart />
    </div>
  )
}
