import Image from 'next/image'
import React from 'react'

function CategoryCard({name, imageUrl}) {
  return (
    <div className='cursor-pointer group hover:scale-105 p-3 transition duration-200 ease-in-out'>
        <div className='relative w-56 h-56 group-hover:shadow-lg '>
            <Image 
                className='rounded-lg'
                src={imageUrl}
                fill
                alt=""
            />

        </div>

        <h3 className='font-semibold text-lg py-1 text-center'>{name}</h3>

    </div>
  )
}

export default CategoryCard