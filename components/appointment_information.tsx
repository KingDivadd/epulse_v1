'uose client'
import React from 'react'
import Image from 'next/image'

const AppointmentInformation = () => {
    return (
        <section className="w-full h-full bg-white rounded-lg p-5 flex flex-col items-start justify-start gap-4">
            <span className="w-full flex items-center justify-between pb-3 flex-wrap whitespace-nowrap gap-3 border-b border-gray-200 ">
                <p className="text-md font-medium text-slate-800">{"Doctor's Card"}</p>

                <span className="flex items-center justify-end gap-1">
                    <button className="px-5 h-[40px] 5 rounded-sm cursor-pointer bg-[#f2f2f2] duration-300 hover:bg-[#f2f2f2]/90 text-gray-600 text-[13px]">Cancel</button>
                    <button className="px-5 h-[40px] 5 rounded-sm cursor-pointer bg-[#306ce8] duration-300 hover:bg-[#306ce8]/90 text-white text-[13px]">Start Consultation</button>
                </span>
            </span>

            <span className="overflow-auto w-full h-[400px] relative rounded-lg">
                <Image src={'/profile-img-2e.jpg'} alt='doc-img' layout='fill' objectFit='cover' className='rounded-lg' />
            </span>

            <div className="w-full flex flex-col gap-2">
                <span className="flex w-full gap-2 items-center justify-start">
                    <p className="text-sm font-medium">{"Doctor's Name:"}</p>
                    <p className="text-sm ">Dr. Davies Robert</p>
                </span>
                <span className="flex w-full gap-2 items-center justify-start">
                    <p className="text-sm font-medium">{"Doctor's Speciality:"}</p>
                    <p className="text-sm ">General Practice</p>
                </span>
                <span className="flex w-full gap-2 items-center justify-start">
                    <p className="text-sm font-medium">Language:</p>
                    <p className="text-sm ">English, Korean</p>
                </span>
                <span className="flex flex-col w-full gap-2 ">
                    <p className="text-sm font-medium">Description:</p>
                    <p className="text-sm leading-[25px]">With over 15 years of extensive experience in the field, I focus on preventive care and chronic disease management, aiming to improve patient outcomes and advance community health practices.</p>
                </span>
            </div>
        </section>
    )
}

export default AppointmentInformation