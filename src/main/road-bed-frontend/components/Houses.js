import Image from 'next/image'
import React from 'react'


export default function Houses({houses}) {

    return (
    <div className='px-8 sm:px-16 mt-6 max-w-7xl mx-auto'>
        {houses.map(house => (
            <Image
                key={house.houseId}
                className='w-96 object-contain'
                src={house.imageUrl}
                alt=""
                width={100}
                height={100}
            />
        ))}
    </div>
  )
}
