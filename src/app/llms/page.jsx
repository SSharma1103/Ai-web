"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CommentModerator from "../components/CommentModerator";

export default function GeminiChat() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const salesPrompt = `
      You are a salesman of a smartphone. Your job is to convince the customer to buy the phone.response should be short and to the point, highlighting the key features and benefits of the phone.
      also provide customer support information if needed.dont include any information you are not sure about. 

      Here are the phone details:
      - Model: Nova X1 Pro
      - Display: 6.7" AMOLED, 120Hz refresh rate
      - Processor: Snapdragon 8 Gen 2
      - Camera: 108MP (main) + 12MP (ultra-wide) + 5MP (macro), 32MP front camera
      - Battery: 5000mAh with 65W fast charging
      - Price: ₹49,999
      - Special Features: In-display fingerprint sensor, AI camera features, 5G support, dual stereo speakers

      Now continue with this prompt from a customer: "${input}"
    `;

    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({ prompt: salesPrompt }),
    });
    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 bg-black">
        <h1 className="text-5xl font-bold text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            AI Toolkits
          </span>
        </h1>

        <div className="flex flex-col h-[50vh] w-full p-6 rounded-lg border border-white/20 shadow-lg backdrop-blur-md bg-white/10">
          <h2 className="text-xl font-bold mb-2 text-white">AI Salesman</h2>
          <p className="text-white mb-2 text-sm">
            Ask a question as a potential customer. The AI will respond as a smartphone salesperson pitching the Nova X1 Pro.
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini as a customer..."
            className="w-full p-2 border text-white bg-black/40 border-white/20 rounded resize-none"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 transition-all shadow-lg border border-white/20 backdrop-blur-sm"
            >
              Ask
            </button>
          </div>
          <pre className="mt-4 text-white whitespace-pre-wrap">{output}</pre>
        </div>

        {/* Spacer */}
        <div className="h-12" />

        {/* Comment Moderator Section */}
        <div className="flex flex-col p-6 rounded-lg border border-white/20 shadow-lg backdrop-blur-md bg-white/10">
          <h2 className="text-xl font-bold mb-2 text-white">Comment Moderator</h2>
          <p className="text-white text-sm mb-4">
            This tool helps filter inappropriate or harmful messages submitted by customers during the conversation.
          </p>
          <CommentModerator />
        </div>
      </div>
    </div>
  );
}
