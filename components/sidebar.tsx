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
    const {user_information} = useChat()

    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)
    }, [])

    function handle_route(id:string) {
        setCurrent_route(id)
        // localStorage.setItem('route', id) 

        if(id === 'logout'){
            localStorage.clear();
            sessionStorage.clear();
        }
    }

    return (
        <div className="w-full  flex flex-col gap-3 h-full bg-white ">
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

export default Sidebar