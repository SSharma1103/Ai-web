"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function AddEvent() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  async function handleAddEvent() {
    setLoading(true);
    setError(null);
    setResponse(null);

    const event = {
      summary: "AI+ Meeting",
      description: "Team sync up with AI team",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // +30 mins
    };

    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create calendar event.");
      }

      setResponse(data);
    } catch (err) {
      console.error("Error adding event:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <div className="text-center text-white space-y-4 p-6 bg-white/5 rounded-lg border border-white/20 shadow-lg backdrop-blur-sm">
        <p className="text-red-400/90">Please sign in to add events</p>
        <button
          onClick={() => signIn("google")}
          className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm shadow-lg"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[50vh] w-full p-6 rounded-lg border border-white/20 shadow-lg backdrop-blur-md bg-white/10">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2 text-white">AI Calendar Assistant</h2>
        <p className="text-white/80 mb-4">
          This AI agent helps you quickly schedule meetings by automating calendar event creation. When you click the button, it will:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-white/80">
          <li>Create a 30-minute event starting now</li>
          <li>Set the title to "AI+ Meeting"</li>
          <li>Add a description "Team sync up with AI team"</li>
          <li>Handle all the API calls to your calendar service</li>
        </ul>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <button
          onClick={handleAddEvent}
          disabled={loading}
          className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 transition-all shadow-lg border border-white/20 backdrop-blur-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            "Add Calendar Event"
          )}
        </button>

        {response && response.success && (
          <div className="w-full p-3 bg-green-400/20 text-green-100 rounded-lg backdrop-blur-sm border border-green-400/30">
            ✅ Event created successfully!
          </div>
        )}

        {error && (
          <div className="w-full p-3 bg-red-500/20 text-red-200 rounded-lg backdrop-blur-sm border border-red-400/30">
            ❌ {error}
          </div>
        )}
      </div>
    </div>
  );
}
