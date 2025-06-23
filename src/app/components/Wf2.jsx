"use client";

import {
  ClipboardDocumentCheckIcon,
  WrenchScrewdriverIcon,
  PresentationChartLineIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function ScrumSteps() {
  const steps = [
    {
      title: "1. Plan",
      description: "Identify features or tasks for the next sprint.",
      color: "bg-purple-500",
      Icon: ClipboardDocumentCheckIcon,
    },
    {
      title: "2. Design & Build",
      description: "Develop and test the chosen features.",
      color: "bg-yellow-500",
      Icon: WrenchScrewdriverIcon,
    },
    {
      title: "3. Review",
      description: "Demo work to stakeholders, collect feedback.",
      color: "bg-teal-500",
      Icon: PresentationChartLineIcon,
    },
    {
      title: "4. Improve",
      description: "Retrospective to refine process for the next sprint.",
      color: "bg-pink-500",
      Icon: ArrowPathIcon,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center px-6 py-5 rounded-lg border border-white/20 shadow-lg backdrop-blur-md bg-white/10 text-white">
      <h2 className="w-full text-left text-xl font-bold mb-2 text-white">
        Scrum Workflow Steps
      </h2>
      <p className="w-full text-left text-sm text-white/80 mb-6">
        This process uses <span className="font-semibold text-white">AI agents</span> to automate planning, progress tracking, and retrospective analysis.
      </p>

      {/* Connector Line */}
      <div className="hidden lg:flex w-full justify-center relative mb-10">
        <div className="absolute top-[90px] w-[80%] h-[2px] bg-white/30 z-0" />
      </div>

      {/* Boxes */}
      <div className="flex flex-wrap justify-center items-start gap-10 max-w-7xl w-full">
        {steps.map((step, idx) => {
          const Icon = step.Icon;
          return (
            <div
              key={idx}
              className={`group relative z-10 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[230px] lg:h-[230px] rounded-2xl ${step.color} transition-all duration-300 ease-in-out hover:scale-105 border-2 border-white/20 shadow-lg`}
            >
              <div className="flex flex-col items-center justify-center h-full p-4 text-center space-y-4">
                <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                <div className="text-lg sm:text-xl font-bold">{step.title}</div>
                <div className="text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
