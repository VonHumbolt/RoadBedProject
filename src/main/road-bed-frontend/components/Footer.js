import React from 'react'

function Footer() {
  return (
    <div className='bg-teal-600'>

        <div className='max-w-7xl mx-auto px-8 sm:px-16 flex flex-row justify-evenly py-8'>
            
            <div>
                <h3 className='text-lg pb-3 font-semibold'> About </h3> 
                <p className='text-slate-800'>Road Bed</p>
                <p className='text-slate-800'>FAQ</p>
            </div>
            <div>
                <h3 className='text-lg pb-3 font-semibold'>Privacy & Terms</h3>
                <p className='text-slate-800'>Privacy</p>
                <p className='text-slate-800'>Terms</p>

            </div>
            <div>
                <h3 className='text-lg pb-3 font-semibold'> Contact </h3>
                <p className='text-slate-800'>Email</p>
                <p className='text-slate-800'>Phone</p>
                <p className='text-slate-800'>Fax</p>

            </div>
            <div>
                <h3 className='text-lg pb-3 font-semibold'> Social </h3>
                <p className='text-slate-800'>Instagram</p>
                <p className='text-slate-800'>Twitter</p>
                <p className='text-slate-800'>Youtube</p>

            </div>

        </div>


    </div>
  )
}

export default Footer