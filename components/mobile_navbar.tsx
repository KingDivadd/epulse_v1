'use client'
import React, {useState,useEffect} from 'react'
import { route_list } from '@/constants';
import Link from 'next/link'
import Image from 'next/image';

const MobileNavbar = () => {
    const [current_route, setCurrent_route] = useState('')

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
    }, [])


    return (
        <div className="w-full flex items-center justify-center px-3">
            <div className="w-full h-[50px] bg-white gap-6 rounded-md flex items-center justify-center ">
                {
                    route_list.map((route,ind)=>{
                        return(
                            <Link href={route.path} className={current_route === route.path ? "current-mobile-nav-item": "mobile-nav-item"} key={ind} onClick={()=>setCurrent_route(route.path) } >
                                <route.icon className=' duration-200' />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MobileNavbar