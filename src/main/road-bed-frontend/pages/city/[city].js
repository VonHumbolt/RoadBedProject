import Header from '@/components/Header';
import HouseCard from '@/components/HouseCard';
import React from 'react'

function City({houses, city}) {

  return (
    <div>

        <Header />

        <div className='max-w-7xl mx-auto'>
            <h3 className='text-xl mt-12 px-8 font-semibold'> 
            Houses in {city} <span className='text-gray-500 text-sm'> · {houses.length > 10 ? "10+" : houses.length} Stays </span>
            </h3>
            <div className='border-b border-gray-300 mx-8 mt-2' />
            <div className="py-10 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {houses.map((house) => (
                    <HouseCard key={house.houseId} house={house} />
                ))}
            </div>

        </div>

    </div>
  )
}

export async function getServerSideProps(context) {
    const { city } = context.params;
   
    const houses = await fetch(
      "http://localhost:8080/houses/getByCityName/" + city
    ).then((res) => res.json());
  
    return {
      props: {
        houses,
        city
      },
    };
  }

export default City