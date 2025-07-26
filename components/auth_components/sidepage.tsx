'use client'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules' // Import Autoplay module
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Sidepage = () => {
    return (
        <section className="w-full h-screen relative">
            <div className="top-0 w-full h-full relative overflow-hidden">
                <Image
                    src="/sidepage-img-2.jpg"
                    alt="Sidepage Image"
                    fill
                    className="object-cover object-center"
                    />
            </div>

            <div className="hidden absolute bottom-10 w-full px-[1rem] z-10 h-[100px] justify-center">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    // pagination={{ clickable: true }}
                    navigation={false}
                    loop={true}
                    // autoplay={{
                    //     delay: 12000, // Slide every 3 seconds (adjust as needed)
                    //     disableOnInteraction: false, // Continue autoplay after user interaction
                    // }}
                    modules={[Pagination, Navigation, Autoplay]} // Include Autoplay module
                    className="w-full h-full">

                        {
                        [1,2,3,4,5,6].map((slide, index)=>{
                            return (
                                <SwiperSlide key={index} className="flex items-center justify-center h-full w-[300px]">
                                    <div className="w-full h-full flex items-center justify-center bg-white p-4 rounded-lg shadow-lg">
                                        <p className="text-lg font-semibold">Slide {slide+2} Content</p>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                    
                </Swiper>
            </div>
        </section>
    )
}

export default Sidepage