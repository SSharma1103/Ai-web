"use client";

import { useState } from "react";

export default function CommentModerator() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleModerate() {
    setLoading(true);
    const res = await fetch("/api/moderate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-[50vh] w-full p-6 rounded-lg border border-white/20 shadow-lg backdrop-blur-md bg-white/10 text-white">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2">AI Comment Moderator</h2>
        <p className="text-white/80 mb-4">
          This AI agent scans comments for hate speech, spam, or off-topic content using a moderation model.
        </p>

        <textarea
          className="w-full p-3 mb-4 rounded-md bg-white/10 text-white border border-white/20 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
          rows={4}
          placeholder="Paste a YouTube comment here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={handleModerate}
            disabled={loading}
            className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 transition-all shadow-lg border border-white/20 backdrop-blur-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </span>
            ) : (
              "Moderate Comment"
            )}
          </button>

          {result && (
            <div className="w-full p-3 bg-blue-400/20 text-blue-100 rounded-lg backdrop-blur-sm border border-blue-400/30">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
