'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RiSearchLine, RiAttachment2 } from 'react-icons/ri';
import { toast_msg } from '@/lib/toast';
import {messages_data} from '@/constants'
import { format_date_from_unix, get_time_from_unix } from '@/lib/date_formater';
import { IoSend,IoClose } from "react-icons/io5";
import { useChat } from '@/app/context/ChatContext';
import { Loader2Icon } from 'lucide-react';
import ScrollToBottom from 'react-scroll-to-bottom';

interface SelectedChatProps {
    loading_2:boolean; 
    setLoading_2:(loading_2:boolean)=>void, 
    physician_img:string; 
    setPhysician_img:(physician_img:string)=>void;}

const SelectedChat = ({loading_2, setLoading_2, physician_img, setPhysician_img}:SelectedChatProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(messages_data);
    const messagesContainerRef = useRef<HTMLDivElement>(null); // Renamed for clarity
    const {user_information, show_selected_chat, chat_list, selected_user} = useChat()

    useEffect(() => {
        // Scroll to bottom of the messages container
        messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });

    }, [messages]);

    useEffect(() => {

        const selected_chat = sessionStorage.getItem('s-c')
        if (selected_chat) {
            setLoading_2(!loading_2)
        }
        if (!selected_chat) {
            setLoading_2(!loading_2)
        }
        if (!physician_img) {
            setPhysician_img(sessionStorage.getItem('p-i') || '/default-male.png')
        }
    }, [])

    return (
        <div className="w-full h-full bg-white rounded-sm p-4 flex flex-col items-start justify-between gap-2 shadow-md">
            {selected_user && 
            <div className=" w-full flex items-center justify-between max-md:justify-end border-b border-[#f2f2f2] pb-3">
                <span className="max-md:hidden h-[40px] flex items-center justify-start gap-2">
                    <span className="h-[40px] w-[40px] rounded-full relative overflow-hidden">
                        <Image src={selected_user.avatar || 'default-male.png'} alt="" fill className="object-cover" />
                    </span>
                    <span className="flex flex-col items-start justify-center">
                        <p className="text-[13px] font-semibold">{selected_user.first_name} {selected_user.last_name}</p>
                        <p className="text-[12px]">{selected_user.role == 'physician' ? ( selected_user.registered_as == 'Specialist') ? selected_user.specialty : selected_user.registered_as == 'General Doctor' ? 'General Doctor' : '' : ''}</p>
                    </span>
                </span>

                <span className="flex items-center justify-end gap-3 lg:gap-1">
                    
                    {/* <button className="bg-[#306ce9] h-[40px] md:px-5 rounded-full text-white text-[12px] py-2.5">Start Consultation</button> */}
                    
                    
                </span>
            </div>}

            <div className={`w-full ${selected_user ? 'h-[calc(100vh-265px)]':'h-[calc(100vh-200px)]'} bg-white flex flex-col py-3.5 rounded-sm justify-between ` }>
            
                { chat_list.length == 0 ?

                    <div className="w-full h-full flex items-center justify-center relative ">
                        <p className="text-[13px] text-gray-600 text-center py-2">{!loading_2 && "No message sent yet!"}</p>

                        {loading_2 && 
                        <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                            <Loader2Icon className='size-8 animate-spin text-gray-500' />
                        </div> }
                    </div>
                    :
                    <ScrollToBottom className="w-full h-full " >

                        <div className="w-full h-full flex flex-col gap-2 relative ">
                            {loading_2 && 
                                <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                    <Loader2Icon className='size-8 animate-spin text-green-500' />
                                </div> }
                            
                            {
                                chat_list.map((msg,ind)=>{
                                    const {is_patient, is_physician, date} = msg

                                    const sender_dir = is_patient ? 'justify-end':'justify-start'
                                    const sender_box_color = is_patient ? 'bg-[#306ce9] text-white':'bg-[#306ce9]/70 text-white'
                                    const prevSender = ind > 0 ? chat_list[ind - 1].is_patient : null;
                                    const additionalSpacing = ind > 0 && is_patient !== prevSender ? 'mt-4' : 'mt-2';
                                    const date_time = format_date_from_unix(Number(date)/1000)


                                    return(
                                        <div key={ind} className={`w-full flex ${sender_dir} ${additionalSpacing} `}>
                                            <div key={ind} className={`flex items-start gap-3 min-w-auto w-[80%]  lg:max-w-[75%] 2xl:max-w-[60%] `}>
                                                {is_physician && <span className="h-[35px] w-[35px] rounded-full relative overflow-hidden">
                                                    <Image src={physician_img || '/default-male.png'} alt={''} fill className="object-cover" />
                                                </span>}
                                                <div className={`p-2 rounded-b-sm flex-1  ${sender_box_color}`}>
                                                    <p className="text-[12px]">{msg.text}</p>
                                                    <p className="text-[10px] w-full text-end mt-1">{date_time.time}</p>
                                                </div>
                                                {is_patient && <span className="h-[35px] w-[35px] rounded-full relative overflow-hidden">
                                                    <Image src={user_information?.avatar! } alt={''} fill className="object-cover" />
                                                </span>}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                </ScrollToBottom>}
                


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

                {<span className="h-full w-15 flex items-center justify-center">
                    <IoSend size={'20px'} className={`cursor-pointer duration-300 ${message ? "text-[#306ce9]": "text-gray-600"} `}/>
                </span>}
            </form>
        </div>
    );
};

export default SelectedChat;