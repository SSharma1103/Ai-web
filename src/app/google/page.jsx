"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import AddEvent from "../components/AddEvent";
import SendMailButton from "../components/SendMailButton";


export default function Google() {
  

  return (
    <div className=" bg-black">
      <Navbar />
      <div className="p-4 bg-black">

        <h1 className="text-5xl font-bold text-white ">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            AI Toolkits
          </span>
        </h1>
       
        </div>
        <div className="h-3 bg-black" />
        <AddEvent />
        <div className="h-8 bg-black" />
        <SendMailButton />
      </div>
    
    
  );
}
