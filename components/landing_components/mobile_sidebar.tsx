'use client'
import React from 'react'
import Link from 'next/link'
import {landing_navbar_data} from '@/constants/index'


const MobileSidebar = ({setShow_side_nav}:{setShow_side_nav: React.Dispatch<React.SetStateAction<boolean>>;}) => {
    
    return (
        <div className="md:hidden w-full h-screen flex flex-col py-[20px] px-[15px] absolute right-0 top-0 z-50 bg-white gap-7">
            <header className="w-full h-[30px] flex items-center justify-end cursor-pointer" >

            </header>
            <main className="w-full flex flex-col gap-5">
                <Link href={'/login'} className=" py-2 px-5 rounded-full bg-[#306ce9] hover:bg-[#306ce9]/80 duration-150 text-white z-20 text-[15px] font-mont">Get Started</Link>
                {
                    landing_navbar_data.map((data:{title:string, icon: string, id: string}, ind:number)=>{
                        const {title, id} = data
                        return(
                            <Link key={ind} href={id} className="text-[#2F2F2F] text-[15px] font-mont font-semibold" onClick={()=> setShow_side_nav(false)}>{title}</Link>
                        )
                    })
                }
            </main>
        </div>
    )
}

export default MobileSidebar