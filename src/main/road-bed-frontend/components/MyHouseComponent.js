import React from 'react'
import MyHouseCard from './MyHouseCard'

function MyHouseComponent({houses}) {
  return (
    <div>
        <h2>My Houses · {houses.length > 10 ? "10+" : houses.length} House</h2>
        <div className='border border-1 border-slate-300 my-1' />
        <div className='pt-2'>
          {houses.map(house => (
            <MyHouseCard key={house.houseId} house={house} />
          ))}
        </div>


    </div>
  )
}

export default MyHouseComponent