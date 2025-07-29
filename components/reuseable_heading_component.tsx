'use client'
import React from 'react'
import Image from 'next/image'  

const SidebarHeading = () => {
    return (
        <span className=" flex  items-center gap-2 ">
            <span className="hidden relative overflow-hidden h-[40px] w-[40px] rounded-full">
                <Image
                    src="/profile-img-2a.jpg"
                    alt="personal"
                    fill
                    objectFit='cover'
                />
            </span>
            <h5 className="hidden lg:block font-semibold font-mont text-xl text-gray-700 truncate">{"EPulse"}</h5>

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