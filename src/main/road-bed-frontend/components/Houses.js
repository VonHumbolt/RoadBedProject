import Image from "next/image";
import React from "react";

export default function Houses({ houses }) {
  return (
    <div className="px-8 sm:px-16 mt-24 max-w-7xl mx-auto flex space-x-2 overflow-x-scroll
    scrollbar-thin scrollbar-thumb-teal-600">
      {houses.map((house) => (
        <div>
          <Image
            key={house.houseId}
            className="w-52 h-52 object-cover rounded-xl"
            src={house.imageUrlList[0]}
            alt=""
            width={100}
            height={100}
          />
          <p className="font-semibold p-1">{house.city.cityName}</p>
        </div>
      ))}
    </div>
  );
}
