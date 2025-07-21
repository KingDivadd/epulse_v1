import React from 'react'

import Navbar from '@/components/landing_components/navbar'
import Header from '@/components/landing_components/header'
import AboutUs from '@/components/landing_components/about_us'
import Doctors from '@/components/landing_components/doctors'
import Services from '@/components/landing_components/services'
import Testimonial from '@/components/landing_components/testimonial'
import Footer from '@/components/landing_components/footer'

const LandingPage = () => {
    return (
        <div className='w-[100vw] h-screen '>
            <Navbar />
            <Header />
            <AboutUs />
            <Doctors />
            <Services />
            <Testimonial />
            <Footer />
        </div>
    )
}

export default LandingPage