'use client'
import React, {useState, useEffect} from 'react'
import {BellIcon, } from 'lucide-react' 
import Image from 'next/image'
import Link from 'next/link'
import {useChat} from '@/app/context/ChatContext'
import { DropdownMenu,  DropdownMenuContent,   DropdownMenuLabel,  DropdownMenuRadioGroup, DropdownMenuRadioItem,  DropdownMenuSeparator,  DropdownMenuTrigger, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger} from "@/components/ui/dropdown-menu"
import { Button } from 'react-day-picker'

const DashboardNav = () => {
    const [current_route, setCurrent_route] = useState('')
    const {show_mobile_sidebar, setShow_mobile_sidebar,} = useChat()

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
    }, [])


    return (
        <nav className="px-5 lg:px-8 xl:px-10 w-full flex items-center justify-between h-[60px] sm:h-[90px]  ">
            <div className="flex-1 h-full flex items-center justify-start gap-3 font-mont">

                <span className=" sm:hidden h-full flex items-center jusify-center rotate-180 " onClick={()=> setShow_mobile_sidebar(!show_mobile_sidebar)}>
                    <span className="h-5 w-5 overflow-hidden relative">
                        <Image src={'/icons/menu-black.png'} alt='sun' fill objectFit='cover' />
                    </span>
                </span>
                
                <span className="h-full flex items-center jusify-center">
                    <span className="h-10 w-10 overflow-hidden relative">
                        <Image src={'/sun.png'} alt='sun' fill objectFit='cover' />
                    </span>
                </span>

                <div className="flex flex-col items-start justify-center gap-2">
                    <h3 className="max-sm:hidden font-mont font-semibold text-2xl">Hello David!</h3>
                    <p className="text-[13px] text-slate-700 font-mont">{"It's 30 degress outside. Stay hydrated"}</p>

                </div>
            </div>

            <div className="md:w-[350px] flex items-center justify-end gap-5 ">
                {/* <Button className='hidden h-[45px] md:block bg-gradient-to-t from-[#306ce9] to-[#306ce9]/60 px-7 text-white font-mont rounded-full text-[13px] '>Schedule a consultation</Button> */}
                

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center justify-center">
                            <BellIcon size={'25px'} className='text-gray-600' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" w-72 border-0" align="end">
                        <DropdownMenuLabel className='text-md font-mont '>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className='bg-[#f2f2f2] min-h-72 p-2'>
                            <DropdownMenuItem className='bg-white h-15'></DropdownMenuItem>
                            
                        </DropdownMenuGroup>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
                

                <div className="flex items-center justify-start gap-3">
                    <Link href={'/settings'} className="relative h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] overflow-hidden rounded-md">
                        <Image src={'/profile-img-2c.jpg'} alt='profiile-img' fill objectFit='cover' />
                    </Link>
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