'use client'
import React, {useState,useEffect} from 'react'
import { route_list } from '@/constants';
import Link from 'next/link'
import {useChat} from '@/app/context/ChatContext'
import { useRouter } from 'next/navigation';
import SidebarHeading from './reuseable_heading_component';
import { RiMenuFold3Line } from "react-icons/ri";

const MobileSidebar = () => {
    const [current_route, setCurrent_route] = useState('')
    const {show_mobile_sidebar, setShow_mobile_sidebar,user_information} = useChat()
    const router = useRouter()

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
    }, [])


    return (
        <div className="w-full  flex flex-col gap-3 h-full bg-white ">
            <span className="w-full flex justify-between items-center h-24  pr-5"> 
                <span className="w-full flex justify-start h-24 "> <SidebarHeading /> </span>


                <RiMenuFold3Line className=' size-[27.5px] text-gray-700 ' onClick={()=> setShow_mobile_sidebar(!show_mobile_sidebar)} />
                


            </span>

            <article className="w-full flex flex-col pr-2 xl:pr-5 relative">
                {
                    route_list.map((route, ind:number)=>{

                        const {role} = route

                        let show_route;
                        if (user_information && user_information.role) {
                            
                            show_route = role.includes(user_information.role) ? '':'hidden'
                        }


                        return(

                            <div key={ind} className={`w-full ${show_route}`}>
                                <Link href={route.path} className={`pl-5 xl:px-8   ${ current_route === route.path ? "current-nav-item bg-blue-100  ": "nav-item "}`} 
                                onClick={()=>  {
                                        if(route.id == 'logout'){
                                            localStorage.clear()
                                            return;
                                        }
                                        setCurrent_route(route.path)

                                    }}>
                                    <route.icon size={'18px'} className=' duration-200' />
                                    <h5 className={current_route === route.path ? " current-nav-item-text": " nav-item-text"}>{route.name}</h5>
                                </Link>
                            </div>
                        )
                    })
                }

            </article>
        </div>
    )
}

export default MobileSidebar