import React from 'react'
import SectionTitle from './section_title'
import { motion } from 'framer-motion'
import TestimonialSlider from './testimonial_slider'


const Testimonials = () => {
    return (
        <section 
            id='testimonials' className="w-full min-h-[55vh] px-[1rem] md:px-[2rem] lg:px-[5rem] xl:px-[9rem] py-15 md:py-20  scroll-mt-20  flex flex-col items-center  ">

            <SectionTitle title='Testimonials' />

            <p className="mt-10 text-xl sm:text-3xl w-[250px] sm:w-[350px] text-center font-[500] font-mont">Patient Trust, Our Priority</p>

            <p className="text-[13px] sm:text-md text-center sm:w-[500px] text-slate-600 mt-5 font-mont">We are proud to have helped thousands of patients from various countries get the best medical services.</p>
            

            <div className="w-full mt-8 flex items-center justify-center ">

                <TestimonialSlider />
            </div>

        </section>
    )
}

export default Testimonials