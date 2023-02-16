import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function CategoryCard({ name, imageUrl }) {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer group hover:scale-105 p-3
     transition duration-200 ease-in-out"
      onClick={() => router.push(`/houseCards/${name}`)}
    >
      <div className="relative w-24 h-24 sm:w-36 sm:h-36 group-hover:shadow-lg">
        <Image className="rounded-lg" src={imageUrl} fill alt="" />
      </div>

      <h3 className="font-semibold text-md sm:text-lg py-1 text-center">{name}</h3>
    </div>
  );
}

export default CategoryCard;
