import React from "react";
import HouseBox from "./HouseBox";

export default function Houses({ houses }) {
  return (
    <div className="px-8  sm:px-16 max-w-7xl mx-auto">
      <p className="text-xl font-bold my-6 text-[#633036] border-t-[1.5px] border-gray-300 pt-5">
        Houses from random cities
      </p>
      <div
        className="flex overflow-scroll scrollbar-thin  
      scrollbar-thumb-teal-600 space-x-3 overflow-y-hidden"
      >
        {houses.map((house) => (
          <HouseBox
            key={house.houseId}
            house={house}
            imageUrl={house.imageUrlList[0].imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
