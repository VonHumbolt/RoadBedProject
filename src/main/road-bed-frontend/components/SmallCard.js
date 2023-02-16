import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function SmallCard({ img, name }) {

  const router = useRouter();

  return (
    <div
      className="m-2 mt-5 flex flex-col items-center sm:items-start
        group cursor-pointer"
        onClick={() => router.push(`/city/${name}`)}
    >
      <div className="relative h-24 w-24 sm:h-36 sm:w-64">
        <Image className="rounded-xl" src={img} fill alt="" sizes={100}/>
        <div
          className="absolute h-24 w-24 sm:h-36 sm:w-64 flex items-center justify-center
            rounded-xl group-hover:bg-gradient-to-r from-teal-500 to-slate-500 group-hover:opacity-90 
            transiton duration-100 ease-out text-white"
        >
          <h2 className="hidden group-hover:inline text-md sm:text-xl font-bold ">
            {""}
            {name}{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
