import Image from "next/image";
import React from "react";

function HostRegisterCard() {
  return (
    <div //[#ed6172]
      className="mt-24 relative w-[400px] sm:w-[600px]
        md:w-[800px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1100px]
     bg-gradient-to-r from-teal-500 to-slate-500 mx-auto p-5 rounded-2xl"
    >
      <div className="flex flex-col h-64 items-start py-3">
        <h2 className="font-bold text-4xl text-slate-700"> Become a Host</h2>
        <p className="text-2xl text-slate-200 pt-5 ">
          Move your house to Road Bed.
        </p>
        <p className="text-2xl text-slate-200 pb-8">
          Rent your house to people and start to earn income.
        </p>

        <button className="p-3 rounded-full bg-slate-700 text-white font-semibold
         cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-150 ease-in-out">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default HostRegisterCard;
