"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddEvent() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  async function handleAddEvent() {
    setLoading(true);
    const event = {
      summary: "AI+ Meeting",
      description: "Team sync up with AI team",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // +30 mins
    };

    const res = await fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    const data = await res.json();
    setLoading(false);
    setResponse(data);
  }

  if (!session) {
    return <p className="text-red-500">Please sign in to add events</p>;
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddEvent}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Calendar Event"}
      </button>
      {response && response.success && (
        <p className="text-green-500">✅ Event created!</p>
      )}
    </div>
  );
}
