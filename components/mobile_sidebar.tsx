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
    const {show_mobile_sidebar, setShow_mobile_sidebar,user_information, route, setRoute} = useChat()
    const router = useRouter()
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        
        const path = window.location.pathname.replace(/\//, '')

        const routes = ['dashboard', 'appointments', 'doctors', 'consultation', 'wallet', 'profile']

        const stored_route = localStorage.getItem('route')

        const verified_stored_root = stored_route && routes.includes(stored_route)

        if (route) {
            setCurrent_route( route)
            stored_route !== route && localStorage.setItem('route', route)
            
        }else if (path && routes.includes(path)) {
            setCurrent_route(path)
            localStorage.setItem('route', path)
        }else if(verified_stored_root){
            setCurrent_route(stored_route)
            path !== stored_route && router.push(`/${stored_route}`)
        }else{
            setCurrent_route(path)
            setRoute(path)
            localStorage.setItem('route', path)
        }
    }, [route, clicked])


    return (
        <div className="w-full  flex flex-col gap-3 h-full bg-[#306ce9] ">
            <span className="w-full flex justify-between items-center h-24  pr-5"> 
                <span className="w-full flex justify-start h-24 "> <SidebarHeading /> </span>

                <RiMenuFold3Line className=' size-[27.5px] text-gray-100 ' onClick={()=> setShow_mobile_sidebar(!show_mobile_sidebar)} />

            </span>

            <article className="w-full flex flex-col pr-5 relative">
                {
                    route_list.map((route, ind:number)=>{

                        const {role} = route

                        let show_route;
                        if (user_information && user_information.role) {
                            
                            show_route = role.includes(user_information.role) ? '':'hidden'
                        }

                        return(

                            <div key={ind} className={`w-full ${show_route}`}>
                                <Link href={route.path} className={`pl-5 xl:px-8   ${ current_route === route.id ? "current-nav-item ": "nav-item "}`} 
                                onClick={()=>  {
                                        if(route.id == 'logout'){
                                            localStorage.clear()
                                            return;
                                        }
                                        setCurrent_route(route.path);
                                        setRoute(route.id);
                                        setClicked(!clicked);
                                        localStorage.setItem('route',route.id);
                                        setShow_mobile_sidebar(!show_mobile_sidebar)

                                    }
                                    }>
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