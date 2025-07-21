import React from 'react'
import SectionTitle from './section_title'
import { motion } from 'framer-motion'
import DoctorSlider from './doctors_slider'


const Doctors = () => {
    return (
        <section 
            id='doctors' className="w-full min-h-screen px-[1rem] md:px-[2rem] lg:px-[5rem] xl:px-[9rem] py-10 md:py-15  scroll-mt-20  flex flex-col items-start  ">

            <SectionTitle title='Categories Doctor' />

            <p className="mt-10 text-xl sm:text-3xl w-[250px] sm:w-[350px] text-start font-[500] font-mont">Find the Right Doctor for Your Needs</p>

            <p className="text-[13px] sm:text-md text-start sm:w-[500px] text-slate-600 mt-5 font-mont">Whether you need a general consultation, specialist care or mental health support, we have the right doctor for you.</p>
            

            <div className="w-full mt-8 flex items-center justify-center ">

                <DoctorSlider />
            </div>

        </section>
    )
}

export default Doctors