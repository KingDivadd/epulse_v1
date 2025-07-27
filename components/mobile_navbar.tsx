'use client'
import React, {useState,useEffect} from 'react'
import { route_list } from '@/constants';
import Link from 'next/link'
import Image from 'next/image';
import {useChat} from '@/app/context/ChatContext'



const MobileNavbar = () => {
    const [current_route, setCurrent_route] = useState('')
    const {show_mobile_sidebar, setShow_mobile_sidebar,} = useChat()

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
    }, [])


    return (
        <div className="w-full  flex flex-col gap-3 h-full bg-white ">
            <span className="w-full flex justify-between items-center h-24 px-5 "> 
                <span className=" flex items-start gap-2 ">
                    <span className="relative overflow-hidden h-8 w-8 ">
                        <Image
                            src="/logo.png"
                            alt="epulse logo"
                            fill
                            className="object-cover"
                        />
                    </span>
                    <h5 className=" font-bold font-mont text-[20px] text-gray-700">EPulse</h5>

                </span>

                <span className="h-4 w-4 relative overflow-hidden" onClick={()=> setShow_mobile_sidebar(!show_mobile_sidebar)}>
                    <Image src={'/icons/close-black.png'} alt='' fill layout='contain' />
                </span> 


            </span>

            <article className="w-full flex flex-col pr-2 lg:pr-5 relative">
                {
                    route_list.map((route, index) => (
                        <Link key={index} href={route.path} className={current_route === route.path ? "pl-5 lg:px-8 current-nav-item bg-blue-100  ": "pl-5 lg:px-8 nav-item "} onClick={()=>  {
                                    setCurrent_route(route.path)
                                    setShow_mobile_sidebar(!show_mobile_sidebar)
                                }
                            }>
                            <route.icon size={'18px'} className=' duration-200' />
                            <h5 className={'font-mont'}>{route.name}</h5>
                        </Link>))
                }

            </article>
        </div>
    )
}

export default MobileNavbar