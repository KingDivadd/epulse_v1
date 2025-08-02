'use client'
import React, { useEffect } from 'react'

import Navbar from '@/components/landing_components/navbar'
import Header from '@/components/landing_components/header'
import AboutUs from '@/components/landing_components/about_us'
import Doctors from '@/components/landing_components/doctors'
import Services from '@/components/landing_components/services'
import Testimonial from '@/components/landing_components/testimonial'
import Footer from '@/components/landing_components/footer'
import MobileNavbar from '@/components/landing_components/mobile_navbar'
import { useChat } from '../context/ChatContext'

const LandingPage = () => {
    const {show_mobile_nav, setShow_mobile_nav} = useChat()
    

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (show_mobile_nav) {
            setShow_mobile_nav(false);
        }
    };

    const handleMobileSidebarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };


    return (
        <div className='w-[100vw] h-screen relative' onClick={handleOutsideClick}>
            <Navbar />
            <Header />
            <AboutUs />
            <Doctors />
            <Services />
            <Testimonial />
            <Footer />

            <div className={`w-full sm:hidden min-h-[300px] bg-[#306ce9] shadow-md rounded-b-lg ${show_mobile_nav ? "top-0":"top-[-500px]"} fixed top-0 z-50 duration-500 ease-in-out`} onClick={handleMobileSidebarClick}>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default LandingPage