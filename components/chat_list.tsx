'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { useChat } from '@/app/context/ChatContext'

const ChatList = () => {
    const {show_selected_chat, setShow_selected_chat} = useChat()

    function handle_show_chat(data:any) {
        setShow_selected_chat(!show_selected_chat)
    }

    return (
        <div className=" flex flex-col gap-3  w-full h-full justify-start ">
            <h3 className="font-mont font-semibold text-lg  text-slate-700">Messages</h3>

            <div className="w-full mt-2 overflow-y-auto max-h-[calc(100vh-160px)]  hide-scrollbar ">

                <div className="w-full flex flex-col gap-2.5">
                    {
                        [1,2,3,4,5,6,7,8,9,0].map((data,ind)=>{
                            return(
                                <div key={ind} className="w-full h-[80px] sm:h-[90px] bg-white shadow-md  hover:bg-[#306ce9] duration-200 hover:text-white rounded-md p-2 sm:p-3 font-mont flex items-center justify-start gap-2 group cursor-pointer" onClick={()=> handle_show_chat(data) }>
                                    <div className=" h-full flex items-start">
                                        <span className="h-[50px] w-[50px] relative overflow-hidden rounded-full">
                                            <Image src={'/profile-img-2b.jpg'} alt='' fill objectFit='cover'  />
                                        </span>
                                    </div>

                                    <span className="flex-1 h-full flex flex-col justify-center items-start gap-1.5 sm:gap-2">
                                        <p className="text-sm font-medium">{"Dr Mike Rebuern"}</p>
                                        <p className="text-[12px] h-[35px] w-full line-clamp-2 ">
                                            {"Okay, let's check your vitals and perform a physical exam. It could be a number of things let's check your vitals and perform a physical exam. It could be a number of things."}
                                        </p>
                                    </span>

                                    <span className="w-[30px] flex flex-col h-full items-between justify-between">
                                        <p className="text-[12px]">{"12:45"}</p>
                                        <p className="text-[10px] text-center py-0.5 rounded-full bg-[#f2f2f2] group-hover:bg-blue-400">{"12"}</p>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default ChatList