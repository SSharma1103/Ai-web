"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SendMailButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  const sendMail = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch("/api/gmail", {
        method: "POST",
        body: JSON.stringify({
          to: "recipient@example.com",
          subject: "Hello from AI+ App",
          message: "This is a test message from your Next.js app!",
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to send email");
      }

      setSuccess(true);
    } catch (err) {
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
    <div className="flex flex-col h-[54vh] w-full p-6 rounded-lg border border-white/20 shadow-lg backdrop-blur-md bg-white/10">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">Email Sender</h3>
        <p className="text-white/80 mb-4">
          Send test emails directly through your Gmail account
        </p>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-white/80">Recipient:</p>
            <div className="text-white bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
              recipient@example.com
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-white/80">Subject:</p>
            <div className="text-white bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
              Hello from AI+ App
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-white/80">Message:</p>
            <div className="text-white/90 bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20 min-h-[80px]">
              This is a test message from your Next.js app!
            </div>
          </div>

          {/* Message on the left, button on the right */}
          <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
            {/* Feedback message on the left */}
            {success && (
              <div className="p-3 bg-green-400/20 text-green-100 rounded-lg backdrop-blur-sm border border-green-400/30 min-w-[200px]">
                ✅ Email sent!
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/20 text-red-200 rounded-lg backdrop-blur-sm border border-red-400/30 min-w-[200px]">
                ❌ {error} <br />
                Signing out...
              </div>
            )}

            {/* Button on the right */}
            <button
              onClick={sendMail}
              className="ml-auto px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 transition-all shadow-lg border border-white/20 backdrop-blur-sm"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
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
        </div>
      </div>
    </div>
  );
}
