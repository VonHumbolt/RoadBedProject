import Image from "next/image";
import React from "react";

function SmallCard({ img, name }) {
  return (
    <div
      className="m-2 mt-5 flex flex-col items-center sm:items-start
        group cursor-pointer"
    >
      <div className="relative h-36 w-64">
        <Image className="rounded-xl" src={img} fill />
        <div
          className="absolute h-36 w-64
            rounded-xl group-hover:bg-teal-300 group-hover:opacity-90 
            transiton duration-100 ease-out"
        >
          <h2 className="absolute top-1/3 left-1/3
           hidden group-hover:inline text-xl font-bold ">
            {" "}
            {name}{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
