import Image from "next/image";
import React from "react";

function MyHouseCard({house}) {
  return (
    <div>
      <div
        className="flex justify-between border border-1 border-gray-200 shadow-md rounded-lg my-2
          hover:scale-105 transition-all transform duration-200 ease-in-out cursor-pointer"
      >
        <div className="w-64 h-52 px-3 hidden sm:flex justify-center items-center">
          <Image
            className="w-64 h-40 object-cover rounded-lg"
            src={house.imageUrlList[0]}
            width={1200}
            height={900}
          />
        </div>

        <div className="flex flex-col flex-grow p-6 space-y-1 justify-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            {house.description}
          </h3>
          <p className="text-gray-500 text-sm">{house.category.categoryName} · {house.capacity} guests</p>
          <p className="text-gray-600 text-md">{house.address}</p>
        </div>

        <div className="flex flex-col justify-center py-6 px-12">
          <p className="text-lg sm:text-2xl font-semibold">{house.price}₺</p>
        </div>

        <div className="flex flex-col px-10 justify-evenly">
          <div className="px-8 py-1 bg-teal-500 rounded-lg shadow-md
           hover:scale-105 transform transition-all duration-200 ease-in-out">
            <button>Update</button>
          </div>
          <div className="px-8 py-1 bg-[#ED6172] text-white rounded-lg shadow-md 
          hover:scale-105 transform transition-all duration-200 ease-in-out">
            <button>Remove</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MyHouseCard;
