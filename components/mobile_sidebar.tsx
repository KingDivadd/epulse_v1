'use client'
import React, {useState,useEffect} from 'react'
import { route_list } from '@/constants';
import Link from 'next/link'
import Image from 'next/image';
import {useChat} from '@/app/context/ChatContext'
import { useRouter } from 'next/navigation';
import SidebarHeading from './reuseable_heading_component';



const MobileSidebar = () => {
    const [current_route, setCurrent_route] = useState('')
    const {show_mobile_sidebar, setShow_mobile_sidebar,} = useChat()
    const router = useRouter()

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
    }, [])


    return (
        <div className="w-full  flex flex-col gap-3 h-full bg-white ">
            <span className="w-full flex justify-between items-center h-24  pr-5"> 
                <span className="w-full flex justify-start h-24 "> <SidebarHeading /> </span>

                <span className="h-4 w-4 relative overflow-hidden" onClick={()=> setShow_mobile_sidebar(!show_mobile_sidebar)}>
                    <Image src={'/icons/close-black.png'} alt='' fill layout='contain' />
                </span> 


            </span>

            <article className="w-full flex flex-col pr-2 lg:pr-5 relative">
                {
                    route_list.map((route, ind:number)=>{
                        const {role} = route
                        const show_route = role.includes('physician') ? '':'hidden'

                        return(
                            <div  key={ind} className={`w-full ${show_route}`}>
                                <Link href={route.path} className={current_route === route.path ? "pl-5 lg:px-8 current-nav-item bg-blue-100  ": "pl-5 lg:px-8 nav-item "} onClick={()=>  {
                                        if(route.id == 'logout'){
                                            localStorage.clear()
                                            return;
                                        }
                                        setCurrent_route(route.path)
                                        setShow_mobile_sidebar(!show_mobile_sidebar)

                                    }
                                    }>
                                    <route.icon size={'18px'} className=' duration-200' />
                                    <h5 className={'font-mont'}>{route.name}</h5>
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