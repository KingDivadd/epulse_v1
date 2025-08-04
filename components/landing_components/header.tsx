'use client'
import React from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import HeaderListCards from "./header_list_cards"

const Header = () => {
    return (
        <header className="w-[100vw] min-h-screen px-5 pb-5   flex flex-col items-center  relative">

                <div className="  -z-10   w-[100vw] ">
                    <Image src={'/wallet-img-1.jpg'} alt='header bg color' fill={true} objectFit='cover'  className='w-full' />
                </div>

                <motion.p 
                    initial={{y: -30, opacity: 0}}
                    whileInView={{y: 0, opacity: 1}}
                    transition={{duration: 0.4, delay: 0.15 }}
                    
                    className="z-10 text-white mt-30 sm:mt-35 max-w-3xl font-mont font-[500] md:font-semibold text-3xl sm:text-5xl lg:text-[50px] leading-3xl md:leading-[75px] align-middle text-center  ">Seamless Hospital Booking for Your Health Needs
                </motion.p>

                <motion.div 
                    initial={{y: 30, opacity:0}}
                    whileInView={{y: 0, opacity: 1}}
                    transition={{duration: 0.4, delay: 0.15}}

                    className="z-10 w-full flex items-center justify-center">
                    <HeaderListCards />
                </motion.div>


        </header>
    )
}

export default Header