import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard";



const getCities = async () => {
  const result = await fetch("http://localhost:8080/cities/getall").then(res => res.json())
  return result;
}

function Cities() {


  const [cities, setCities] = useState([])
  
  useEffect(() => {
    getCities().then(result => setCities(result));
  }, [])


  return (
    <div className="relative max-w-7xl mx-auto py-20 px-8 sm:px-16">
      <h2 className="text-2xl pb-3 text-[#633036] font-bold border-b border-gray-700">
        Explore Different Cities
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {cities?.map((item) => (
          <SmallCard key={item.cityName} img={item.cityImageUrl} name={item.cityName} /> 
        ))} 
      </div>
    </div>
  );
}


export default Cities;
