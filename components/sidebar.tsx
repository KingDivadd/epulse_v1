'use client'
import React, {useState, useEffect} from 'react'
import SidebarHeading from './reuseable_heading_component';
import Image from 'next/image'
import Link from 'next/link';
import { route_list } from '@/constants';

const Sidebar = () => {
    const [current_route, setCurrent_route] = useState('')

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
    }, [])

    function handle_route(item:any) {
        setCurrent_route(item.id)
        if(item.id === 'logout'){
            localStorage.clear();
            sessionStorage.clear();
        }
    }

    // if (!current_route) return null
    return (
        <div className="w-full  flex flex-col gap-3 h-full bg-white ">
            <span className="w-full flex justify-start items-center h-24 pl-7 "> <SidebarHeading /> </span>

            <article className="w-full flex flex-col pr-2 lg:pr-5 relative">
                {
                    route_list.map((route, index) => (
                        <Link key={index} href={route.path} className={current_route === route.path ? "pl-5 lg:px-8 current-nav-item bg-blue-100  ": "pl-5 lg:px-8 nav-item "} onClick={(route)=> handle_route}>
                            <route.icon size={'18px'} className=' duration-200' />
                            <h5 className={current_route === route.path ? "hidden lg:block current-nav-item-text": "hidden lg:block nav-item-text"}>{route.name}</h5>
                        </Link>))
                }

            </article>
        </div>
    )
}

export default Sidebar