'use client'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules' // Import Autoplay module
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {  service_list, testimonial_list, } from '@/constants'

const ServicesSlider = () => {
    return (
        <article className="w-full relative">

            <div className=" w-full ">
                <Swiper
                    spaceBetween={20}
                    breakpoints={{
                        // Default (mobile < 768px)
                        0: {
                            slidesPerView: 1,
                        },
                        // Medium screens (≥ 768px)
                        640: {
                        slidesPerView: 2,
                        },
                        // Large screens (≥ 1024px)
                        1024: {
                        slidesPerView: 3,
                        },
                    }}
                    //   pagination={{ clickable: true }}
                    navigation={false}
                    loop={true}
                    autoplay={{
                        delay: 10000, // Set to 10 seconds (10000 milliseconds)
                        disableOnInteraction: false, // Continue autoplay after user interaction
                    }}
                    modules={[Pagination, Navigation, Autoplay]} // Include Autoplay module
                    className="w-full h-full"
                    >

                        {
                        service_list.map((slide, index)=>{
                            const {description, img, title} = slide


                            return (
                                <SwiperSlide key={index} className="  rounded-md flex items-center justify-start font-mont">
                                    <div className=" flex flex-col min-h-[90px] items-center justify-start gap-3">
                                        <span className="relative h-[200px] w-full overflow-hidden rounded-md bg-[#306ce9]">
                                            <Image src={ '/service-bg.jpg'} alt='' fill objectFit='cover' />
                                        </span> 

                                        <div className="w-full h-full flex flex-col justify-between items-start gap-3">
                                            <p className="text-[15.5px] font-medium text-white">{title}</p>

                                            <p className="text-sm text-gray-100 line-clamp-3 ">{description}</p>

                                            <button className="h-[45px] bg-white hover:bg-gray-100 rounded-full w-[200px] flex items-center justify-center text-sm font-medium gap-1">{'Book appointment'}</button>
                                        </div>
                                    </div>                                
                                </SwiperSlide>
                            )
                        })
                    }

                    
                </Swiper>
            </div>
        </article>
    )
}

export default ServicesSlider