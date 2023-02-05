import Header from '@/components/Header'
import Image from 'next/image'
import React from 'react'

function Category({houses}) {
 
  return (
    <div>

      <Header />

        <h3> Small Flats Category</h3>

      <div className='max-w-7xl mx-auto py-10 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>


        {houses.map(house => (
          <div key={house.houseId} className="border-1 mb-4 w-72 h-72 mx-auto shadow-lg rounded-2xl hover:shadow-2xl cursor-pointer
            hover:scale-105 transform transition-all duration-150 ease-in-out">
            
            <Image className='w-72 h-52 rounded-t-2xl mx-auto' src={house.imageUrlList[0]} width={1200} height={100} />
            
            <div className='p-4'>

              <p className='text-sm text-gray-500'>{house.capacity} Guests · {house.category.categoryName} {" "}
              · {house.city.cityName}</p>

              <p className='text-lg font-semibold text-start mt-3 mr-2'>{house.price}₺</p>
              
            
            </div>
            
          </div>

        ))}
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const {category} = context.params

  const houses = await fetch("http://localhost:8080/houses/getByCategoryName/"+category)
                        .then(res => res.json());

  return {
    props:{
      houses
    }
  }
}

export default Category