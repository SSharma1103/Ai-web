"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import AddEvent from "../components/AddEvent";
import SendMailButton from "../components/SendMailButton";

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
     
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Gemini..."
        className="w-full p-2 border text-white"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-white text-black rounded"
      >
        Ask
      </button>
      <pre className="mt-4 whitespace-pre-wrap">{output}</pre>
      <h1 className="text-4xl font-bold text-white mb-6">AI Tools</h1>
      <AddEvent />
      <div className="h-8" />
      <SendMailButton />
    </div></div>
  );
}
