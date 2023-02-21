import React from 'react'
import VisitedHouseCard from './VisitedHouseCard'

function MyVisitedHouseComponent({visits}) {
  return (
    <div>
        <h2>Visited Houses · {visits.length > 10 ? "10+" : visits.length} House</h2>
        <div className='border border-1 border-slate-300 my-1' />
        <div className='pt-2'>
          {visits.map(visit => (
            <VisitedHouseCard key={visit?.house?.houseId} visit={visit} />
          ))}
        </div>
    </div>
  )
}

export default MyVisitedHouseComponent