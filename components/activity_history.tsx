'use client'
import React from 'react'
import Image from 'next/image'

const ActivityHistory = () => {
    return (
        <div className="w-full flex flex-col gap-3 ">
            <h3 className="font-mont font-semibold text-lg text-slate-700">History</h3>

            <div className="w-full min-h-[70vh] max-h-[1172px] overflow-y-auto hide-scrollbar ">
                <div className="w-full flex flex-col gap-5">

                    {
                        [1,2,3,4,5,6,7,8,9,10].map((data, ind)=>{
                            return(
                                <article key={ind} className="w-full min-h-[100px] shadow-md rounded-sm flex flex-col gap-3 p-3 bg-white font-mont">
                                    <h5 className="text-[13px] font-medium text-[#306ce9]  ">Scheduled Consultation</h5>

                                    <h4 className="text-[13px] font-medium">24th of July 2025, 12:00 PM</h4>

                                    <span className="w-full h-[45px] flex items-center justify-start gap-3">
                                        <span className="w-15 flex items-center justify-center  h-full">
                                            <span className="relative overflow-hidden h-[40px] w-[40px] rounded-[45px] ">
                                                <Image src={'/profile-img-2a.jpg'} alt='physician img' fill objectFit='cover' />
                                            </span>
                                        </span>

                                        <span className="flex-1 flex flex-col justify-between h-[90%] ">
                                            <h4 className="text-[13px] font-medium ">Orthopaedist</h4>
                                            <h4 className="text-[12px]  ">dr David Iroegbu</h4>
                                        </span>
                                    </span>
                                </article>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ActivityHistory