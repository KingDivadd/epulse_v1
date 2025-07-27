'use client'
import React from 'react'
import Image from 'next/image'  

const SidebarHeading = () => {
    return (
        <span className=" flex items-center gap-2 ">
            <span className="relative overflow-hidden h-8 w-8 ">
                <Image
                    src="/logo.png"
                    alt="epulse logo"
                    fill
                    className="object-cover"
                />
            </span>
            <h5 className="hidden lg:block font-semibold font-mont text-[15px] text-gray-600">EPulse</h5>

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