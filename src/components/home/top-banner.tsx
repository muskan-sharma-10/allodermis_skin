import React from 'react'
import LazyImage from '../lazy-image-load'

const TopBanner = () => {
    return (
        <>
            <section>
               <div className='image-full'>
                    <LazyImage src={'/images/home-top-bg-mobile.jpeg'} className='block sm:hidden'  alt={`Banner`} />
                    <LazyImage src={'/images/home-top-bg.jpeg'} className='hidden sm:block'  alt={`Banner`} />
               </div>
            </section>
        </>
    )
}

export default TopBanner