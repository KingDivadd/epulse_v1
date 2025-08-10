'use client'
import { consultation_card_list } from '@/constants'
import React from 'react'

const DashboardAppointment = () => {
    return (
        <div className="w-full  bg-white rounded-md shadow-md p-5 pb- flex flex-col gap-5 font-mont overflow-hidden">
            <p className="text-lg font-medium">Recent Appointments</p>

            <div className="hidden md:block  w-full overflow-x-auto">

                <div className="min-w-[975px]  min-h-30">
                    <div className="w-full flex items-center justify-between border h-[55px] bg-white border-gray-200 ">

                        <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start h-full ">
                            <p className="text-[13px] font-medium">Dr. Name</p>
                        </div>
                        <div className="w-[35%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Sepcialty</p>
                        </div>
                        <div className="lg:w-[30%] 2xl:w-[25%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Appoitment Date</p>
                        </div>
                        <div className="lg:w-[15%] 2xl:w-[20%] px-3 sm:px-5 flex items-center justify-start">
                            <p className="text-[13px] font-medium">Status</p>
                        </div>
                    </div>

                    <div className="w-full bg-white pb-5 ">
                        {[1,2,3,4,5].map((data,ind:number)=>{
                            return(
                                <div key={ind} className="w-full flex items-center justify-between py-2.5 even:bg-gray-50 hover:bg-gray-50">
                                    <div className="w-[20%] px-3 sm:px-5 flex items-center justify-start">
                                        <p className="text-[13px] ">Dr. Sophia Wong</p>
                                    </div>
                                    <div className="w-[35%] px-3 sm:px-5 flex items-center justify-start">
                                        <p className="text-[13px] ">{"Allergy and Immunology"}</p>
                                    </div>
                                    <div className="lg:w-[30%] 2xl:w-[25%] px-3 sm:px-5 flex items-center justify-start">
                                        <p className="text-[13px] ">{"22nd of September, 4:40am"}</p>
                                    </div>
                                    <div className="lg:w-[15%] 2xl:w-[20%] px-3 sm:px-5 flex items-center justify-start">
                                        {ind%2==1? <button className="h-[35px] text-[13px] px-5 rounded-full border-amber-500 border bg-amber-500/10 text-amber-500">
                                        pending</button>:<button className="h-[35px] text-[13px] px-5 rounded-full border-green-500 border bg-green-500/10 text-green-500">
                                        approved</button>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full  flex flex-col md:hidden gap-0">
                {
                    [1,2,3,4,5].map((data,ind:number)=>{
                        return(
                            <div key={ind} className="w-full flex items-center justify-between border-b border-gray-100 last:border-0 min-h-20 py-2">
                                <div className="flex-1 h-full gap-2 flex flex-col items-start justify-between ">
                                    <p className="w-full text-[14px] font-medium  ">{"Dr. Sophia Wong"}</p>
                                    <p className="w-full text-[14px] text-gray-600 line-clamp-2 ">{"Physical Medicine and Rehabilitation"}</p>
                                </div>

                                <div className="max-w-36 h-full gap-2 flex flex-col items-end justify-between line-clamp-2 ">
                                    <p className="text-[13px] w-full text-end">{"22nd of September, 4:40am"}</p>
                                    {ind%2==1? <p className="text-[14px] text-green-500 " >approved</p>:<p className="text-[12px] text-amber-500 " >pending</p>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default DashboardAppointment