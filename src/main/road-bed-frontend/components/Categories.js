import React from "react";
import CategoryCard from "./CategoryCard";

export default function Categories({ categories }) {
  
  return (
    <div className="px-8 sm:px-16 mt-6 max-w-7xl mx-auto">
      <h3 className="text-xl font-bold pb-6 text-[#633036]">Categories</h3>
      <div className="flex overflow-scroll scrollbar-thin  
      scrollbar-thumb-teal-600 space-x-3 overflow-y-hidden">
      
        {categories.map(({categoryId, categoryName, categoryImageUrl}) => (
          <CategoryCard
            key={categoryId}
            name={categoryName}
            imageUrl={categoryImageUrl}
          />
        ))}
      </div>
    </div>
  );
}