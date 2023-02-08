import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SearchedHouseCard from '@/components/SearchedHouseCard';
import { format } from 'date-fns';
import { useRouter } from 'next/router'
import React from 'react'

const houses=[
  {
    houseId: '63dbd3fe45999674422d3e9e',
    capacity: 3,
    imageUrlList: [
      'http://res.cloudinary.com/dspea8wm4/image/upload/v1675351037/x9zcf6svoep9ocxmrunw.webp',
      'http://res.cloudinary.com/dspea8wm4/image/upload/v1675351038/wmatvzt0k1uo1vs9nnaa.webp'
    ],
    price: 600,
    category: {
      categoryId: '63da626d877fdc122e435912',
      categoryName: 'Small Flat',
      categoryImageUrl: 'https://res.cloudinary.com/dspea8wm4/image/upload/v1675256307/small_flat_jhnrhu.jpg'
    },
    city: {
      cityId: '63d8f811885b136bbeaf2acb',
      cityName: 'Çanakkale',
      cityImageUrl: 'https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg'
    },
    address: 'Barbaros Mah, Plaj Sk, Gülsüm Apt, No:8'
  },
  {
    houseId: '63df7e15b0f91a27568bcc2c',
    capacity: 5,
    imageUrlList: [
      'http://res.cloudinary.com/dspea8wm4/image/upload/v1675591186/nafxfsrakjz8ff2fuytv.webp',
      'http://res.cloudinary.com/dspea8wm4/image/upload/v1675591187/wazdjhxrzjhg79yuryry.webp',
      'http://res.cloudinary.com/dspea8wm4/image/upload/v1675591188/vghdggunb8ii8qtyaazu.webp'
    ],
    price: 1200,
    category: {
      categoryId: '63da626d877fdc122e435912',
      categoryName: 'Small Flat',
      categoryImageUrl: 'https://res.cloudinary.com/dspea8wm4/image/upload/v1675256307/small_flat_jhnrhu.jpg'
    },
    city: {
      cityId: '63d8f81c885b136bbeaf2acc',
      cityName: 'Eskişehir',
      cityImageUrl: 'https://www.bizevdeyokuz.com/wp-content/uploads/Eskisehir-porsuk-cayi-tekne-1280x720.jpg'
    },
    address: 'Büyükerşen Bulvarı, Atatürk Sk, No: 2'
  }
]

function Search() {

    const router = useRouter();

    const {city, startDate, endDate} = router.query
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");

  return (
    <div>
        <Header searchQuery={`${city} · ${formattedStartDate} -  ${formattedEndDate}`}/>

        <div className='max-w-7xl h-screen mx-auto px-8'>

            <h4 className='text-gray-500 text-md mt-10'>100+ Houses · {formattedStartDate} - {formattedEndDate} · 3 guests </h4>
            <h2 className='text-xl font-semibold mt-4'>Houses in {city}</h2>

            <div className='border-b border-gray-300 mt-2' />

            {/* Map results */}
            {houses.map(house => (
              <SearchedHouseCard key={house.houseId} house={house} />
            ))}

        </div>
        

        <Footer />
    </div>
  )
}

export default Search