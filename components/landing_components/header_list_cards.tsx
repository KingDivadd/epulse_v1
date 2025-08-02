import React from 'react'
import Image from 'next/image'
import {header_list} from "@/constants"

const HeaderListCards = () => {
    return (
        <div className="w-full md:w-[70%] mt-20 md:mt-30 lg:mt-50 gap-5 sm:gap-[20px] temp-220 ">

            {
                    header_list.map((data, ind)=>{
                        return(
                            <div key={ind} className="min-w-[195px] h-[195px] rounded-[8px]  flex flex-col py-[25px] px-[20px] hover:-translate-y-1 duration-400 shadow-md bg-[#ffffff] ">
                                <span className="h-[40px] w-[40px] flex items-center justify-center rounded-[50px] bg-[#f0f8ff] ">
                                    <data.icon className={`size-[20px] text-[#306ce9]`} />
                                </span>

                                <p className="mt-[24px] font-[500] font-mont group-hover:text-[#ffffff] text-[#101010] text-[18px]">{data.title}</p>

                                <p className="mt-[5px] font-[400] font-mont group-hover:text-[#ffffff] text-[#505050] text-[13px] ">{data.description}</p>

                            </div>
                        )
                    })
                }

        </div>
    )
}

export default HeaderListCards