"use client";

import {
  EnvelopeIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function More() {
  const steps = [
    {
      title: "1. Parse Email",
      description: "AI extracts date, time, and meeting details from email content.",
      color: "bg-red-500",
      Icon: EnvelopeIcon,
    },
    {
      title: "2. Create Event",
      description: "AI formats the extracted info into a calendar event structure.",
      color: "bg-green-500",
      Icon: CalendarDaysIcon,
    },
    {
      title: "3. Add to Calendar",
      description: "Automatically adds the event to your Google Calendar.",
      color: "bg-blue-500",
      Icon: CheckCircleIcon,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center px-6 py-5 rounded-lg border border-white/20 shadow-lg backdrop-blur-md bg-white/10 text-white">
      <h2 className=" w-full text-left text-xl font-bold mb-2 text-white"> Meeting Scheduler from Emails</h2>
      {/* Connector Line */}
      <div className="hidden lg:flex w-full justify-center relative mb-10">
        <div className="absolute top-[90px] w-[70%] h-[2px] bg-white/30 z-0" />
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
