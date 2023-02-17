import Image from "next/image";
import Link from "next/link";
import React from "react";

function HouseCard({ house }) {
  
  return (
    <Link href={"/detail/" + house.houseId}>
      <div
        className="border-1 mb-4 w-72 h-72 mx-auto shadow-lg rounded-2xl hover:shadow-2xl cursor-pointer
              hover:scale-105 transform transition-all duration-150 ease-in-out"
      >
        <Image
          className="w-72 h-52 rounded-t-2xl mx-auto"
          src={house.imageUrlList[0].imageUrl}
          width={1200}
          height={100}
        />

        <div className="p-4">
          <p className="text-sm text-gray-500">
            {house.capacity} Guests · {house.category.categoryName} ·{" "}
            {house.city.cityName}
          </p>

          <p className="text-lg font-semibold text-start mt-3 mr-2">
            {house.price}₺
          </p>
        </div>
      </div>
    </Link>
  );
}

export default HouseCard;
