'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RiSearchLine, RiAttachment2 } from 'react-icons/ri';
import { toast_msg } from '@/lib/toast';
import {messages_data} from '@/constants'
import { get_time_from_unix } from '@/lib/date_formater';
import { IoSend,IoClose } from "react-icons/io5";
import { useChat } from '@/app/context/ChatContext';
import { Skeleton } from './ui/skeleton';



const ChatList = () => {
    const [selected, setSelected] = useState(0)
    const [show_list, setShow_list] = useState(true)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(messages_data);
    const messagesContainerRef = useRef<HTMLDivElement>(null); // Renamed for clarity
    const {setShow_selected_chat, show_selected_chat, user_information} = useChat()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);

        // Scroll to bottom of the messages container
        messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    // async function handle_submit(e: React.FormEvent) {
    //     e.preventDefault();

    //     if (!message.trim()) return;

    //     const newMessage = {

    //         id: messages.length + 1,
    //         sender: 'You',
    //         text: message,
    //         image: '/profile-img-2a.jpg',
    //         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //     };

    //     setMessages((prev) => [...prev, newMessage]);
    //     setMessage('');
    //     try {
    //     toast_msg({ title: `Sent: ${message}` });
    //     } catch (err) {
    //     console.log(err);
    //     }
    // }


    return (
        <>
            <div className="hidden lg:flex flex-col gap-3  w-full h-full justify-start ">
                <h3 className="font-mont font-semibold text-[15.5px]  text-slate-700">{(user_information && user_information.role == 'physician') ? "Patients":"Physicians"}</h3>

                <div className="w-full mt-2 overflow-y-auto max-h-[calc(100vh-160px)]  hide-scrollbar ">
                        
                        
                        <div className="w-full flex flex-col gap-2">
                            {
                                [1,2,3,4,5,6,7,8,9,0].map((data,ind)=>{
                                    const selected_chat = ind == selected ? 'bg-[#306ce9] text-white  ' : 'bg-white hover:bg-[#306ce9] border-gray-300  duration-200 hover:text-white '

                                    const selected_chat_text = ind == selected ? "text-slate-200":"text-gray-500 group-hover:text-slate-200"

                                    const selected_chat_msg_count = ind == selected ? "bg-blue-400":"bg-[#f2f2f2] group-hover:bg-blue-400"

                                    return(
                                        <div key={ind} className={`w-full h-[80px] sm:h-[90px] ${selected_chat}   rounded-sm shadow-sm border p-2 sm:p-3 font-mont flex items-center justify-start gap-2 group cursor-pointer`} onClick={()=> {setShow_selected_chat(!show_selected_chat);setSelected(ind); } }>
                                            <div className=" h-full flex items-start">
                                                <span className="h-[50px] w-[50px] relative overflow-hidden rounded-full">
                                                    <Image src={'/profile-img-2b.jpg'} alt='' fill objectFit='cover'  />
                                                </span>
                                            </div>

                                            <span className="flex-1 h-full flex flex-col justify-center items-start gap-1 sm:gap-2">
                                                <p className="text-[13px] font-medium">{"Mike Rebuern"}</p>
                                                <p className={`text-[12px] h-[35px] w-full line-clamp-2 ${selected_chat_text} duration-200`}>
                                                    {"Okay, let's check your vitals and perform a physical exam. It could be a number of things let's check your vitals and perform a physical exam. It could be a number of things."}
                                                </p>
                                            </span>

                                            <span className="w-[30px] flex flex-col h-full items-between justify-between">
                                                <p className="text-[12px]">{"12:45"}</p>
                                                <p className={`text-[10px] text-center py-0.5 rounded-full duration-200 ${selected_chat_msg_count} `}>{"12"}</p>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    

                </div>

            </div>

            <div className="w-full block lg:hidden">
                {
                    show_list ?
                        <div className=" flex flex-col gap-3  w-full h-full justify-start ">
                            <h3 className="font-mont font-semibold text-lg  text-slate-700">{true ? "Patients":"Physicians"}</h3>

                            <div className="w-full mt-2 overflow-y-auto max-h-[calc(100vh-160px)]  hide-scrollbar ">

                                <div className="w-full flex flex-col gap-2.5 lg:gap-1.5">
                                    {
                                        [1,2,3,4,5,6,7,8,9,0].map((data,ind)=>{
                                            const selected_chat = ind == selected ? 'bg-[#306ce9] text-white  ' : 'bg-white hover:bg-[#306ce9] duration-200 hover:text-white '

                                            const selected_chat_text = ind == selected ? "text-slate-200":"text-gray-500 group-hover:text-slate-200"

                                            const selected_chat_msg_count = ind == selected ? "bg-blue-400":"bg-[#f2f2f2] group-hover:bg-blue-400"

                                            return(
                                                <div key={ind} className={`w-full h-[80px] sm:h-[90px] ${selected_chat}   rounded-sm shadow-md p-2 sm:p-3 font-mont flex items-center justify-start gap-2 group cursor-pointer`} onClick={()=> {setShow_selected_chat(!show_selected_chat); setSelected(ind); setShow_list( !show_list) } }>
                                                    <div className=" h-full flex items-start">
                                                        <span className="h-[50px] w-[50px] relative overflow-hidden rounded-full">
                                                            <Image src={'/profile-img-2b.jpg'} alt='' fill objectFit='cover'  />
                                                        </span>
                                                    </div>

                                                    <span className="flex-1 h-full flex flex-col justify-center items-start gap-1 sm:gap-2">
                                                        <p className="text-[13px] font-medium">{"Dr Mike Rebuern"}</p>
                                                        <p className={`text-[12px] h-[35px] w-full line-clamp-2 ${selected_chat_text} duration-200`}>
                                                            {"Okay, let's check your vitals and perform a physical exam. It could be a number of things let's check your vitals and perform a physical exam. It could be a number of things."}
                                                        </p>
                                                    </span>

                                                    <span className="w-[30px] flex flex-col h-full items-between justify-between">
                                                        <p className="text-[12px]">{"12:45"}</p>
                                                        <p className={`text-[10px] text-center py-0.5 rounded-full duration-200 ${selected_chat_msg_count} `}>{"12"}</p>
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                        :
                        <div className="w-full h-full bg-white rounded-sm p-4 flex flex-col items-start justify-between gap-2 shadow-md">
                            <div className=" w-full flex items-center justify-between max-md:justify-end border-b border-[#f2f2f2] pb-3">
                                <span className="max-md:hidden h-[40px] flex items-center justify-start gap-2">
                                    <span className="h-[40px] w-[40px] rounded-full relative overflow-hidden">
                                        <Image src="/profile-img-2b.jpg" alt="" fill className="object-cover" />
                                    </span>
                                    <span className="flex flex-col items-start justify-center">
                                        <p className="text-[13px] font-semibold">Sophia Wong</p>
                                        <p className="text-[12px]">Optamologist</p>
                                    </span>
                                </span>

                                <span className="flex items-center justify-end gap-1">
                                    {/* <RiSearchLine size="18px" className="text-gray-600" /> */}
                                    <button className=" h-[40px] px-5 rounded-sm bg-gray-200 hover:bg-gray-200/70 duration-200 text-[13px] text-gray-700" onClick={()=> setShow_list(!show_list)}>Cancel</button>

                                    <button className="bg-[#306ce9] h-[40px] px-5 rounded-sm text-white text-[13px] py-2.5">Start Consultation</button>
                                </span>
                            </div>

                            <div className="w-full h-[calc(100vh-265px)] bg-white flex flex-col py-3.5 rounded-sm justify-between  ">
                                {/* <p className="text-[13px] w-full text-center">{"TODAY AT 11:00"}</p> */}

                                <div ref={messagesContainerRef} className="w-full h-full  overflow-y-auto hide-scrollbar">
                                    <div className="w-full flex flex-col gap-2">
                                        {
                                            messages.map((msg,ind)=>{
                                                const {sender,name,id} = msg

                                                const sender_dir = sender === 'patient' ? 'justify-end':'justify-start'
                                                const sender_box_color = sender === 'patient' ? 'bg-[#306ce9] text-white':'bg-[#306ce9]/70 text-white'
                                                const prevSender = ind > 0 ? messages[ind - 1].sender : null;
                                                const additionalSpacing = ind > 0 && sender !== prevSender ? 'mt-4' : '';

                                                return(
                                                    <div key={ind} className={`w-full flex ${sender_dir} ${additionalSpacing} `}>
                                                        <div key={ind} className={`flex items-start gap-3 min-w-auto w-[80%]  lg:max-w-[75%] 2xl:max-w-[60%] `}>
                                                            {sender == 'physician' && <span className="h-[35px] w-[35px] rounded-full relative overflow-hidden">
                                                                <Image src={msg.image} alt={msg.name} fill className="object-cover" />
                                                            </span>}
                                                            <div className={`p-2 rounded-b-sm flex-1  ${sender_box_color}`}>
                                                                <p className="text-[12px]">{msg.text}</p>
                                                                <p className="text-[10px] w-full text-end mt-1">{(get_time_from_unix(Number(msg.time)))}</p>
                                                            </div>
                                                            {sender === 'patient' && <span className="h-[35px] w-[35px] rounded-full relative overflow-hidden">
                                                                <Image src={msg.image} alt={msg.name} fill className="object-cover" />
                                                            </span>}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            </div>

                            <form onSubmit={()=>console.log('')} className="w-full h-[50px] flex items-center justify-start bg-[#f2f2f2] rounded-sm">
                                {/* <span className="w-16 flex items-center justify-center">
                                    <RiAttachment2 size="22px" className="text-gray-600" />
                                </span> */}

                                <input
                                    onChange={(e) => setMessage(e.target.value)}
                                    type="text"
                                    name="message"
                                    id=""
                                    className="input-type-4 h-full flex-1"
                                    placeholder="Write your message..."
                                    value={message}
                                />

                                <span className="h-full w-15 flex items-center justify-center">
                                    <IoSend size={'20px'} className={`cursor-pointer duration-300 ${message ? "text-[#306ce9]": "text-gray-600"} `}/>
                                </span>
                            </form>
                        </div>
                }
            </div>

        </>
    )
}

export default ChatList