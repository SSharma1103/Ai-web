"use client";

import More from "../components/Wf1";
import Navbar from "../components/Navbar";
import ScrumSteps from "../components/Wf2";

export default function Workflow() {
  return (
    <div className="bg-black min-h-screen ">
      <Navbar />
      <div className="p-4">
      <h1 className="text-5xl font-bold text-white mb-4  ">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            AI Toolkits
          </span>
        </h1>
      <div className="h-2"></div>
      <ScrumSteps/>
     
     <div className="h-8"></div>
     <More />
     
     </div>
    </div>
  );
}
