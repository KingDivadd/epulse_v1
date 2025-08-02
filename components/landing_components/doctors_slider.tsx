'use client'
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules' // Import Autoplay module
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {  categories_doctor_list, service_list, testimonial_list, } from '@/constants'
import { useRouter } from 'next/navigation'

const DoctorSlider = () => {

    const router = useRouter()

    function handle_get_started() {
        const auth_id = localStorage.getItem('x-id-key')
        if (!auth_id || auth_id == null) {
            return router.push('/signup-type')
        }else{
            return router.push('/login')
        }
    }


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
                        768: {
                        slidesPerView: 3,
                        },
                        // Large screens (≥ 1024px)
                        1024: {
                        slidesPerView: 4,
                        },
                    }}
                    //   pagination={{ clickable: true }}
                    navigation={false}
                    loop={true}
                    autoplay={{
                        delay: 8000, // Set to 10 seconds (10000 milliseconds)
                        disableOnInteraction: false, // Continue autoplay after user interaction
                    }}
                    modules={[Pagination, Navigation, Autoplay]} // Include Autoplay module
                    className="w-full h-full"
                    >

                        {
                        categories_doctor_list.map((slide, index)=>{
                            const {description, img, number_of_doctors, specialty} = slide


                            return (
                                <SwiperSlide key={index} className=" bg-[#306ce9]  shadow-md p-3.5 rounded-md flex items-center justify-start font-mont">
                                    <div className=" flex flex-col min-h-[90px] items-center justify-start gap-3">
                                        <p className="text-[14px] text-white font-medium w-full text-start">{specialty}</p>

                                        <span className="relative h-[300px] md:h-[200px] w-full overflow-hidden rounded-md ">
                                            <Image src={'/profile-img-2b.jpg'} alt='' fill objectFit='cover' />
                                        </span> 

                                        <div className="w-full h-[130px] flex flex-col justify-between items-start gap-1.5">
                                            
                                            <p className="text-[15.5px] font-medium text-gray-100">{number_of_doctors > 20 ? `20 + Doctors`: `${number_of_doctors} Doctors` }</p>

                                            <p className="text-[13px] text-gray-100 line-clamp-3 ">{description}</p>

                                            <button className="h-[35px] bg-white hover:bg-[#f2f2f2]  rounded-full w-full flex items-center justify-center text-[12.5px] font-medium gap-1" onClick={handle_get_started}>{'Veiw all specialist'}</button>
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

export default DoctorSlider