import Image from "next/image";
import Link from "next/link";
import React from "react";

function HouseBox({ house, imageUrl }) {
  return (
    <Link href={`/detail/${house.houseId}`}>
        <div
        className="cursor-pointer group hover:scale-105 p-3
            transition duration-200 ease-in-out"
        >
          <div className="relative w-52 h-52 group-hover:shadow-lg">
              <Image className="rounded-lg" src={imageUrl} fill alt="" />
          </div>

          <h3 className="font-semibold py-1 text-center">{house.city.cityName}</h3>
        </div>
    
    </Link>
  );
}

export default HouseBox;
