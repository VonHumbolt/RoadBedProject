import Header from '@/components/Header'
import Image from 'next/image'
import React from 'react'

function Category({houses}) {

  return (
    <div>

      <Header />

      <div className='max-w-7xl mx-auto'>
        {houses.map(house => (
          <div key={house.houseId}>
            
            <Image className='w-72 h-64' src={house.imageUrlList[0]} width={100} height={100} />
            
            <p>{house.capacity}</p>
            <p>{house.city.cityName}</p>
            <p>{house.price}₺</p>
            
            
          </div>

        ))}
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const {category} = context.params
  console.log(category)
  const houses = await fetch("http://localhost:8080/houses/getByCategoryName/"+category)
                        .then(res => res.json());

  return {
    props:{
      houses
    }
  }
}

export default Category