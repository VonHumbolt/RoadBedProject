import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SearchedHouseCard from '@/components/SearchedHouseCard';
import { format } from 'date-fns';
import React from 'react'

function Search({city, formattedStartDate, formattedEndDate, houses}) {

  return (
    <div>
        <Header searchQuery={`${city} · ${formattedStartDate} - ${formattedEndDate}`}/>

        <div className='max-w-7xl mx-auto px-8'>

            <h4 className='text-gray-500 text-md mt-10'> {formattedStartDate} - {formattedEndDate} · {houses.length > 10 ? "10+" : houses.length} Houses</h4>
            <h2 className='text-xl font-semibold mt-4'>Houses in {city}</h2>

            <div className='border-b border-gray-300 mt-2' />

            {/* Map results */}
            {houses.map(house => (
              <SearchedHouseCard key={house.houseId} house={house} favorited={false}/>
            ))}

        </div>
      
        <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {

  const {city, startDate, endDate} = context.query
  const formattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yyyy");

  const houses = await fetch(`http://localhost:8080/houses/getByCityNameAndEmptyDate/${city}?start=${format(new Date(startDate), "yyyy-MM-dd")}&end=${format(new Date(endDate), "yyyy-MM-dd")}`)
    .then((res) => res.json());

  return {
    props: {
      city,
      formattedStartDate,
      formattedEndDate,
      houses
    }
  };
}

export default Search