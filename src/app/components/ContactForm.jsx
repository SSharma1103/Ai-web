"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const [to, setTo] = useState("shivamsharma11032009@gmail.com");
  const [subject, setSubject] = useState("Hello from AI+ App");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const sendMail = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    if (!message.trim()) {
      setError("Message cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/gmail", {
        method: "POST",
        body: JSON.stringify({ to, subject, message }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to send email");
      }

      setSuccess(true);
      setMessage("");
    } catch (err) {
      console.error("Failed to send email:", err);
      setError(err.message || "An unknown error occurred");

      setTimeout(async () => {
        await signOut({ redirect: false });
        router.push("/");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-auto w-full max-w-xl p-6 rounded-lg border border-white/20 shadow-lg backdrop-blur-md bg-white/10 mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2">📨 Contact Us</h3>
      <p className="text-white/80 mb-6">
        Reach out to us with any questions or feedback.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-white mb-1">To</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-white mb-1">Subject</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-white mb-1">Message</label>
          <textarea
            rows={5}
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white placeholder-white/50 resize-none"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={sendMail}
            disabled={loading}
            className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 transition-all shadow-lg border border-white/20 backdrop-blur-sm"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Email"
            )}
          </button>
        </div>

        {success && (
          <div className="w-full p-3 bg-green-400/20 text-green-100 rounded-lg backdrop-blur-sm border border-green-400/30">
            ✅ Email sent successfully!
          </div>
        )}

        {error && (
          <div className="w-full p-3 bg-red-500/20 text-red-200 rounded-lg backdrop-blur-sm border border-red-400/30">
            ❌ {error}
            {error !== "Message cannot be empty." && <br />}
            {error !== "Message cannot be empty." && "Signing you out..."}
          </div>
        )}
      </div>
    </div>
  );
}
