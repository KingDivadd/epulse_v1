'use client'
import React, {useState, useEffect} from 'react'
import SidebarHeading from './reuseable_heading_component';
import Image from 'next/image'
import Link from 'next/link';
import { route_list } from '@/constants';
import { useRouter } from 'next/navigation';
import { useChat } from '@/app/context/ChatContext';


const Sidebar = () => {
    const [current_route, setCurrent_route] = useState('')
    const router = useRouter()
    const {user_information, route, setRoute} = useChat()
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        const path = window.location.pathname.replace(/\//, '')


        if (localStorage.getItem('route') || route) {
            setCurrent_route(localStorage.getItem('route') || route)
        }else{
            setCurrent_route(path)
            setRoute(route)
        }
    }, [route, clicked])


    return (
        <div className="w-full  flex flex-col gap-3 h-full bg-[#306ce9] ">
            <span className="w-full flex justify-start h-24 "> <SidebarHeading /> </span>

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
                                <Link href={route.path} className={`pl-5 xl:px-8   ${ current_route === route.id ? "current-nav-item ": "nav-item "}`} 
                                onClick={()=>  {
                                        if(route.id == 'logout'){
                                            localStorage.clear()
                                            return;
                                        }
                                        setCurrent_route(route.path);
                                        setRoute(route.id);
                                        setClicked(!clicked)
                                        localStorage.setItem('route',route.id)

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

export default Sidebar