import Image from "next/image";
import React from "react";
import Link from "next/link";
import { format } from "date-fns";

function VisitedHouseCard({ visit }) {
    
    const startDate = format(new Date(visit?.visitedDates[0]), "dd/MM/yy");
    const endDate = format(new Date(visit?.visitedDates[visit.visitedDates.length-1]), "dd/MM/yy");

  return (
    <Link href={"/detail/" + visit.house.houseId}>
    <div
      className="flex justify-between border border-1 border-gray-200 shadow-md rounded-lg my-2
    hover:scale-105 transition-all transform duration-200 ease-in-out cursor-pointer"
    >
      <div className="w-64 h-52 px-3 hidden sm:flex justify-center items-center">
        <Image
          className="w-64 h-40 object-cover rounded-lg"
          src={visit.house.imageUrlList[0].imageUrl}
          width={1200}
          height={900}
        />
      </div>

      <div className="flex-grow p-6 space-y-1">
        <h3 className="text-lg font-semibold text-gray-700">
          {visit.house.description}
        </h3>
        <p className="text-gray-500 text-sm">
          {visit.house.category.categoryName} · {visit.house.capacity} guests
        </p>
        <p className="text-gray-600 text-md">{visit.house.address}</p>
      </div>

      <div className="flex flex-col justify-between items-center py-6 px-12">
        
        <div className="text-center text-gray-500">
            Visited for <span className="text-black font-medium">{visit.day}</span> days between
            <p><span className="text-black font-medium">{startDate}</span> and <span className="text-black font-medium">{endDate}</span></p>
        </div>

        <p className="text-lg font-semibold">
            <span className="text-md font-normal text-gray-500">You paid: </span> 
            {visit.totalPrice}₺
        </p>
      </div>
    </div>
  </Link>
  )
}

export default VisitedHouseCard