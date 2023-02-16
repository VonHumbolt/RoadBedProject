import React from 'react'
import SearchedHouseCard from './SearchedHouseCard'

function MyFavoritesComponent({houses}) {
  return (
    <div>

        <h2>My Favorite Houses · {houses.length > 10 ? "10+" : houses.length} House</h2>
        <div className='border border-1 border-slate-300 my-1' />
        <div className='pt-2'>
          {houses.map(house => (
            <SearchedHouseCard key={house.houseId} house={house} favorited={true}/>
          ))}
        </div>

    </div>
  )
}

export default MyFavoritesComponent