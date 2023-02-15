import React from 'react'
import MyHouseCard from './MyHouseCard'

function MyHouseComponent({houses}) {
  return (
    <div>
        <h2>My Houses · 10+ House</h2>
        <div className='border border-1 border-slate-300 my-1' />
        <div className='pt-2'>
            <MyHouseCard />
        </div>


    </div>
  )
}

export default MyHouseComponent