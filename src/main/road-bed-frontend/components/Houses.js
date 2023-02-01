import Image from "next/image";
import React from "react";

export default function Houses({ houses }) {
  return (
    <div className="px-8 sm:px-16 mt-6 max-w-7xl mx-auto">
      {houses.map((house) => (
        <div>
          <Image
            key={house.houseId}
            className="w-52 h-52 object-cover rounded-xl"
            src={house.imageUrlList[2]}
            alt=""
            width={100}
            height={100}
          />
          <p>{house.city.cityName}</p>
        </div>
      ))}
    </div>
  );
}
