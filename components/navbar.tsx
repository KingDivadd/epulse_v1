'use client'
import React, {useState, useEffect} from 'react'
import {BellIcon, } from 'lucide-react' 
import Image from 'next/image'
import Link from 'next/link'
import {useChat} from '@/app/context/ChatContext'
import { DropdownMenu,  DropdownMenuContent,   DropdownMenuLabel,   DropdownMenuSeparator,  DropdownMenuTrigger, DropdownMenuItem, DropdownMenuGroup, } from "@/components/ui/dropdown-menu"
import { HiOutlineMenu } from "react-icons/hi";
import { RiMenuFold3Line } from "react-icons/ri";
import { CgMenu } from "react-icons/cg";


const Navbar = () => {
    const [current_route, setCurrent_route] = useState('')
    const {show_mobile_sidebar, setShow_mobile_sidebar,user_information} = useChat()

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
        
    }, [user_information?.avatar])


    return (
        <nav className="px-5 lg:px-8 xl:px-10 w-full grid grid-cols-12 h-[60px] sm:h-[70px] gap-2 bg-white ">
            <div className="col-span-9 md:col-span-10 lg:col-span-8 h-full flex items-center justify-start gap-3 font-mont ">

                <span className=" sm:hidden h-full flex items-center jusify-center rotate-180 " 
                    onClick={()=> setShow_mobile_sidebar(!show_mobile_sidebar)}>

                    <CgMenu  className='size-[24.5px] text-gray-700 ' />
                    
                </span>
                
                <span className="h-full flex items-center jusify-center">
                    <span className="h-9 w-9 overflow-hidden relative">
                        <Image src={'/sun.png'} alt='sun' layout='fill' objectFit='cover' />
                    </span>
                </span>

                <div className="flex h-full w-full flex-col items-start justify-center ">
                    <h3 className="max-sm:hidden font-mont font-semibold text-[20px]">Hello {user_information && user_information.first_name}!</h3>
                    <p className="text-[13px] flex items-center max-sm:h-full text-slate-700 font-mont w-full line-clamp-2">{"It's 30 degress outside. Stay hydrated"}</p>
                </div>
            </div>

            <div className="col-span-3  md:col-span-2 lg:col-span-4 flex items-center justify-end gap-2.5 lg:gap-5 ">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center justify-center">
                            <BellIcon size={'22px'} className='text-gray-700' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" w-72 border-0" align="end">
                        <DropdownMenuLabel className='text-[15.5px] font-mont '>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className='bg-[#f2f2f2] min-h-72 p-2'>
                            <DropdownMenuItem className='bg-white h-15'></DropdownMenuItem>
                            
                        </DropdownMenuGroup>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
                

                <div className="flex items-center justify-start gap-3">
                    <Link href={'/profile'} className="relative h-[30px] sm:h-[40px] w-[30px] sm:w-[40px] overflow-hidden rounded-full ring-2 ring-blue-400">
                        <Image src={user_information && user_information.avatar || '/default-male.png'} alt='profiile-img' layout='fill' objectFit='cover' />
                    </Link>
                    <div className="hidden lg:flex flex-col items-start justify-center font-mont gap-0.5">
                        <h3 className="hidden sm:block font-medium text-[13px] leading-[15px]">
                            {user_information && `${user_information.first_name} ${user_information.last_name}`}
                        </h3>
                        {
                            (user_information && user_information.role == 'physician') 
                            
                            && 
                            
                            <p className="text-[13px] text-slate-700 font-mont leading-[15px]">
                                {( user_information.registered_as == 'Specialist') ? user_information.specialty : user_information.registered_as == 'General Doctor' ? 'General Doctor' : ''}
                            </p>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar