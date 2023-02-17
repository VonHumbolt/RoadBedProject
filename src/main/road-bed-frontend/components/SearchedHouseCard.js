import Image from "next/image";
import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import Link from "next/link";

function SearchedHouseCard({ house, favorited }) {
  const [isFavorite, setIsFavorite] = useState(favorited);

  return (
    <Link href={"/detail/" + house.houseId}>
      <div
        className="flex justify-between border border-1 border-gray-200 shadow-md rounded-lg my-2
      hover:scale-105 transition-all transform duration-200 ease-in-out cursor-pointer"
      >
        <div className="w-64 h-52 px-3 hidden sm:flex justify-center items-center">
          <Image
            className="w-64 h-40 object-cover rounded-lg"
            src={house.imageUrlList[0].imageUrl}
            width={1200}
            height={900}
          />
        </div>

        <div className="flex-grow p-6 space-y-1">
          <h3 className="text-lg font-semibold text-gray-700">
            {house.description}
          </h3>
          <p className="text-gray-500 text-sm">
            {house.category.categoryName} · {house.capacity} guests
          </p>
          <p className="text-gray-600 text-md">{house.address}</p>
        </div>

        <div className="flex flex-col justify-between items-center py-6 px-12">
          <HeartIcon
            className="h-7 w-7 cursor-pointer hover:scale-105 
            transform transition-all duration-200 ease-in-out"
            color="#14b8a5"
            fill={`${isFavorite === false ? "#fff" : "#14b8a5"} `}
            onClick={() => setIsFavorite(!isFavorite)}
          />

          <p className="text-lg font-semibold">{house.price}₺</p>
        </div>
      </div>
    </Link>
  );
}

export default SearchedHouseCard;
