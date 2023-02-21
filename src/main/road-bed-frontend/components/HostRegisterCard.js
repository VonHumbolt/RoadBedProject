import { useRouter } from "next/router";
import React from "react";

function HostRegisterCard() {

  const router = useRouter();

  return (
    <div
      className="mt-20 relative w-[400px] sm:w-[600px]
        md:w-[800px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1100px]
     bg-gradient-to-r from-teal-500 to-slate-500 mx-auto p-5 rounded-2xl"
    >
      <div className="flex flex-row justify-between sm:px-8 h-64 items-center py-3">
        <div>
          <h2 className="font-bold text-4xl md:text-6xl text-slate-700"> Become a Host</h2>
          <p className="text-2xl md:text-3xl text-slate-200 pt-5 ">
            Move your house to Road Bed.
          </p>
          <p className="text-2xl text-slate-300 pb-8 pt-1">
            Rent your house to people and start to earn income.
          </p>

          <button className="p-3 rounded-xl bg-slate-700 text-white font-semibold
          cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-150 ease-in-out"
          onClick={() => router.push("/register")}>
            Register Now
          </button>
        </div>
        <div>
         <img className="hidden sm:flex md:w-80 w-96 object-contain" src="/bg_card.png" alt="" />
        </div>
      </div>
      
    </div>
  );
}

export default HostRegisterCard;
