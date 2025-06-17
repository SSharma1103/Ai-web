import AuthButton from "../components/AuthButton"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to AI Web App</h1>
        <AuthButton />
      </div>
    </div>
  )
}
