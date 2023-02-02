import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { format } from 'date-fns';
import { useRouter } from 'next/router'
import React from 'react'

function Search() {

    const router = useRouter();

    const {city, startDate, endDate} = router.query
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");

  return (
    <div>
        <Header />

        <div className='max-w-7xl h-screen mx-auto'>

            <h2>Stays in {city}</h2>

        </div>
        

        <Footer />
    </div>
  )
}

export default Search