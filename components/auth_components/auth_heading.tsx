'use client'
import React from 'react'
import Link from 'next/link'

const AuthHeading = ({title}:{title:string}) => {
    return (
        <span className="w-full flex flex-col items-center gap-8 ">
            <Link href={'/'} className="font-bold font-mich text-3xl bg-gradient-to-t text-[#306ce9] ">ePulse</Link>

            <p className="text-lg sm:text-xl text-slate-700 font-[500] font-mont">{title}</p>
        </span>
    )
}

export default AuthHeading