'use client'
import React from 'react'
import Image from 'next/image'  
import Link from 'next/link'

const SidebarHeading = () => {
    return (
        <span className=" flex  items-center gap-2  pl-5 xl:pl-8">
            <span className="relative overflow-hidden h-[30px] w-[30px] rounded-full ring-3 ring-blue-300">
                <Image src={'/wallet-img-1.jpg'} alt='wallet img ' fill objectFit='cover' className='' />
            </span>
            <Link href={'/'} className=" font-semibold font-mont text-lg text-white truncate">{"ePulse"}</Link>

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

export const PageHeader = ({text}: {text:string})=>{
    return(
        <h3 className="font-mont font-semibold text-[15.5px] text-slate-700  mb-1 ">{text}</h3>
    )
}