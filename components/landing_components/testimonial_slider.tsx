'use client'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules' // Import Autoplay module
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {  testimonial_list, } from '@/constants'

const TestimonialSlider = () => {
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
                        delay: 9000, // Set to 10 seconds (10000 milliseconds)
                        disableOnInteraction: false, // Continue autoplay after user interaction
                    }}
                    modules={[Pagination, Navigation, Autoplay]} // Include Autoplay module
                    className="w-full h-full"
                    >

                        {
                        testimonial_list.map((slide, index)=>{
                            const {country, country_img, first_name, img, testimonial} = slide


                            return (
                                <SwiperSlide key={index} className="p-3  rounded-md bg-white shadow-md flex items-center justify-start w-[300px] font-mont">
                                    <div className="w-full flex min-h-[90px] items-center justify-start gap-3">
                                        <span className="relative h-[90px] w-[90px] overflow-hidden rounded-md bg-[#306ce9]">
                                            <Image src={ '/sidepage-img-1.jpg'} alt='' fill objectFit='cover' />
                                        </span> 
                                        <div className="flex-1 h-full flex flex-col  justify-between items-start line-clamp-3 gap-2">
                                            <span className="flex items-center jusitfy-start gap-1.5">
                                                <span className="relative overflow-hidden h-5 w-5 rounded-full">
                                                    <Image src={country_img || '/sidepage-img-1.jpg'} alt='' fill objectFit='cover' />
                                                </span>

                                                <p className="text-[13px] text-gray-600">{first_name},</p>
                                                <p className="text-[13px] text-gray-600">{country},</p>
                                            </span>
                                            <p className="text-[13px] text-gray-700 line-clamp-3 ">{testimonial}</p>
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

export default TestimonialSlider