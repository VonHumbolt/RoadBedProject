import React from 'react'
import CategoryCard from './CategoryCard'

function Categories() {
  return (
    <div className='px-8 sm:px-16 mt-6 max-w-7xl mx-auto'>
        <h3 className="text-xl font-bold pb-6 text-[#633036]">Categories</h3>
        <div className='flex overflow-scroll space-x-3 overflow-y-hidden'>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
        </div>

    </div>
  )
}

export default Categories