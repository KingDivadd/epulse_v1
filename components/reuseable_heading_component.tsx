'use client'
import React from 'react'
import Image from 'next/image'  

const SidebarHeading = () => {
    return (
        <span className=" flex  items-center gap-2  pl-5 xl:pl-8">
            <span className="relative overflow-hidden h-[40px] w-[40px] rounded-[2px]">
                <Image src={'/wallet-img-1.jpg'} alt='wallet img ' fill objectFit='cover' className='rounded-md' />
            </span>
            <h5 className=" font-semibold font-mont text-xl text-gray-700 truncate">{"EPulse"}</h5>

        </span>
    )
}

export default SidebarHeading


export const SubHeading = ({ text }: { text: string }) => {
    return (
        <span className="font-mont text-xl font-semibold text-slate-700">
            {text}
        </span>
    )
}