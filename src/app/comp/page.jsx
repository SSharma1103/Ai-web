"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import AddEvent from "../components/AddEvent";
import SendMailButton from "../components/SendMailButton";
import CommentModerator from "../components/CommentModerator";

export default function GeminiChat() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
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
          <p className="text-white mb-2 text-sm">
            Integrate LLMs into your website, automate tasks, and more!
          </p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini..."
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
        <div className="h-8" />
        <AddEvent />
        <div className="h-8" />
        <SendMailButton />
        <div className="h-8" />
        <CommentModerator />
      </div>
    </div>
  );
}
