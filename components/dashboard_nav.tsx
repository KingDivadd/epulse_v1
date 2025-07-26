'use client'
import React, {useState, useEffect} from 'react'
import { Button } from './ui/button'
import {BellIcon, } from 'lucide-react' 
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

const DashboardNav = () => {
    const [current_route, setCurrent_route] = useState('')

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
    }, [])


    return (
        <nav className="px-5 lg:px-8 xl:px-10 w-full flex items-center justify-between h-[60px] sm:h-[90px]  ">
            <div className="flex-1 h-full flex items-center justify-start gap-3">
                <span className="h-full flex items-center jusify-center">
                    <span className="h-10 w-10 overflow-hidden relative">
                        <Image src={'/sun.png'} alt='sun' fill objectFit='cover' />
                    </span>
                </span>

                <div className="flex flex-col items-start justify-center gap-2">
                    <h3 className="max-sm:hidden font-mont font-semibold text-2xl">Hello David!</h3>
                    <p className="text-[13px] text-slate-700 font-mont">It's 30 degress outside. Stay hydrated</p>

                </div>
            </div>

            <div className="md:w-[350px] flex items-center justify-end gap-5 ">
                {/* <Button className='hidden h-[45px] md:block bg-gradient-to-t from-[#306ce9] to-[#306ce9]/60 px-7 text-white font-mont rounded-full text-[13px] '>Schedule a consultation</Button> */}

                <div className="relative lg:p-2  group">
                    <BellIcon className='text-slate-600 group-hover:text-slate-700 duration-200' />
                    {/* <Badge className="absolute top-[-15px] right-[-15px] rounded-full" variant="default">
                        5
                    </Badge> */}
                </div>

                <div className="flex items-center justify-start gap-3">
                    <span className="relative h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] overflow-hidden rounded-md">
                        <Image src={'/profile-img-2c.jpg'} alt='profiile-img' fill objectFit='cover' />
                    </span>
                    {/* <div className="flex flex-col items-start justify-center gap-2">
                        <h3 className="hidden sm:block uhfont-mont font-semibold text-[14px]">David Iroegbu</h3>
                        <p className="text-[13px] text-slate-700 font-mont"></p>
                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default DashboardNav