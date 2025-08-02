'use client'
import React from 'react'
import SectionTitle from './section_title'
import { animate, motion } from 'framer-motion'
import AboutList from './about_list'

const AboutUs = () => {


    return (
        <section id='about' className="w-full min-h-screen  px-[1rem] md:px-[2rem] lg:px-[5rem] xl:px-[9rem] py-10 md:py-15 lg:py-25 scroll-mt-20  flex flex-col items-center bg-gray-100">

            <motion.span    
                initial={{y: -30, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.4, delay: 0.15 }}
            
                className="">
                <SectionTitle title='About Us' />
            </motion.span>

            <motion.p 
                initial={{y: 30, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.4, delay: 0.15 }}

                className="text-[#242424] mt-10 mx-w-3xl sm:max-w-4xl font-mont md:font-[500] text-xl sm:text-4xl lg:text-[35px] leading-2xl md:leading-[45px] align-middle text-center  ">
                    {
                        "We provide exceptional care with a patient-first approach, advanced facilities, and expert doctors for high-quality treatments."
                    }
            </motion.p>

            {/* an image should be added here as te background */}

            <motion.div 
                initial={{y: -30, opacity:0}}
                whileInView={{y: 0, opacity: 1}}
                transition={{duration: 0.4, delay: 0.15}}
            
                className="w-full flex justify-center items-end ">
                    <AboutList />
            </motion.div>
            

        </section>
    )
}

export default AboutUs