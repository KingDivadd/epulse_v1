'use client'
import React from 'react'
import SectionTitle from './section_title'
import { motion } from 'framer-motion'
import ServiceSlider from './services_slider'


const Services = () => {
    return (
        <section 
            id='services' className="w-full min-h-[80vh] px-[1rem] md:px-[2rem] lg:px-[5rem] xl:px-[9rem] py-20 md:py-15  scroll-mt-20  flex flex-col items-start bg-[#306CE9] ">
            
            <motion.span 
                initial={{y: -30, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.4, delay: 0.15 }}
                className="">

                <SectionTitle title='Services' add='bg-white text-[#101010] border-0' />
            </motion.span>

            <motion.p 
                initial={{y: -30, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.4, delay: 0.15 }}

                className="mt-10 text-xl sm:text-3xl  sm:w-[500px] text-[#ffffff] text-start font-[500] font-mont">Complete Health Services with Easy Access and Best Services</motion.p>

            <motion.p 
                initial={{y: -30, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.4, delay: 0.15 }}
            className="text-[13px] sm:text-md text-start sm:w-[500px] text-[#ffffff] mt-5 font-mont">Get quality medical care with a variety of services designed for your comfort and health needs.</motion.p>
            

            <motion.div 
                initial={{y: 30, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    transition={{duration: 0.4, delay: 0.15 }}

            className="w-full mt-10 flex items-center justify-center ">

                <ServiceSlider />
            </motion.div>

        </section>
    )
}

export default Services