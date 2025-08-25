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
import { NotificationType, SocketType } from '@/types'
import { io } from 'socket.io-client'
import { get_auth_request } from '@/app/api'
import { AxiosResponseHeaders } from 'axios'
import { toast_msg } from '@/lib/toast'
import { format_date_from_unix } from '@/lib/date_formater'
import { notification_logic } from '@/lib/notification_logic'


const Navbar = () => {
    const [current_route, setCurrent_route] = useState('')
    const {show_mobile_sidebar, setShow_mobile_sidebar,user_information, triggerActions, setTriggerActions, notification_list, setNotification_list} = useChat()


    const endpoint = process.env.NEXT_PUBLIC_LIVE
    // const endpoint = process.env.NEXT_PUBLIC_BASE
    
    useEffect(() => {
        const path = window.location.pathname
        setCurrent_route(path)

        handle_get_notifications()
        
    }, [user_information?.avatar, triggerActions])

    if (!endpoint) {
        console.log('please provide the socket endpoint')
    }

    async function handle_get_notifications(){
        try {
            
            const res = await get_auth_request(`auth/all-notifications`) as AxiosResponseHeaders

            if (res.status == 200 || res.status == 201) {
                setNotification_list(res.data.notification)
            }else if (res.status == 401){
                toast_msg({type:'danger', title: 'Session expired, kindly login again to continue!'})
            }else{
                toast_msg({type:'danger', title: res.response.data.msg})
            }

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        const socket = io(endpoint)

        const user_id = user_information?.role === 'patient' ? user_information?.patient_id : user_information?.physician_id;

        if (user_id){

            socket.on(`notification-${user_id}`, (data:SocketType)=>{
                const {is_read, notificationData, statusCode} = data
                // console.log('socket status code ',statusCode, 'data ... ', data)
                if (data.statusCode == 200 ){
                    if (notificationData.notification_type.toLocaleLowerCase() == 'appointment'){
                        
                        setTriggerActions({...triggerActions, trigger_appointment_refresh:  !triggerActions.trigger_appointment_refresh})

                    }else if (notificationData.notification_type.toLocaleLowerCase() == 'transaction'){
                            
                        setTriggerActions({...triggerActions, trigger_transaction_refresh:  !triggerActions.trigger_transaction_refresh})

                    }else if (notificationData.notification_type.toLocaleLowerCase() == 'doctor'){
                            
                        setTriggerActions({...triggerActions, trigger_doctors_refresh:  !triggerActions.trigger_doctors_refresh})

                    }
                }
            })

            return () => {
                socket.off(user_id);
                socket.disconnect();
            };
        }
    }, [])


    return (
        <nav className="px-3 sm:px-5 lg:px-8 xl:px-10 w-full grid grid-cols-12 h-[60px] sm:h-[70px] gap-2 bg-white font-mont">
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
                    <DropdownMenuContent className="  border-0" align="end">
                        <DropdownMenuLabel className='text-[15.5px] font-mont '>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className='bg-[#f2f2f2] min-h-72 max-h-[60vh] p-2 w-[350px] sm:w-[400px] overflow-y-auto'>
                            {
                                !notification_list ? 
                                    <div className="w-full h-[50vh] flex items-center justify-center">
                                        <p className="text-[13px] text-gray-700">No notifications yet</p>
                                    </div>:
                                    (
                                        !notification_list.length ?
                                            <div className="w-full h-[50vh] flex items-center justify-center">
                                                <p className="text-[13px] text-slate-700 font-mont ">No new notifications</p>
                                            </div> :
                                            notification_list.map((item, ind)=> {
                                                const date_time = format_date_from_unix(Number(item.created_at))
                                                const notification = notification_logic(item)
                                                return(
                                                    <DropdownMenuItem key={ind} className={`bg-white min-h-15 max-h-25 p-0 rounded-0 ${!item.is_read && 'bg-white border-b border-[#f2f2f2] last:border-0 p-0'}`} onClick={()=> console.log(item)} >
                                                        <div className="flex flex-col items-start justify-center font-mont w-full p-2 gap-1.5">
                                                            <p className="text-[13px] text-gray-700 leading-[15px] ">{notification?.title}</p>
                                                            <p className="text-[12px] text-gray-700 leading-[16.5px] ">{notification?.message}</p>
                                                            <p className="text-[11px] w-full  text-gray-500 text-end whitespace-nowrap ">{date_time.date}, {date_time.time}</p>
                                                        </div>
                                                    </DropdownMenuItem>
                                                )
                                            })
                                    )
                            }
                            {/* <DropdownMenuItem className='bg-white h-15'></DropdownMenuItem> */}
                            
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