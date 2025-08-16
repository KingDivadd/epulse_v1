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
import io from 'socket.io-client'
import { ChatListType, ChatResponseType, ReceiverChatResponseType } from '@/types';

interface SelectedChatProps {
    loading_2:boolean; 
    setLoading_2:(loading_2:boolean)=>void, 
    receiver_img:string; 
    setReceiver_img:(receiver_img:string)=>void;
    show_list: boolean;
    setShow_list: (show_list:boolean)=>void;
}

    



const SelectedChat = ({loading_2, setLoading_2, receiver_img, setReceiver_img, setShow_list, show_list}:SelectedChatProps) => {
    const [message, setMessage] = useState('');
    const {user_information, show_selected_chat, chat_list, setChat_list, selected_user} = useChat()
    const [filtered_chat_list, setFiltered_chat_list] = useState<ChatListType[]>([])
    const [filter_msg, setFilter_msg] = useState('')

    // const endpoint = process.env.NEXT_PUBLIC_LIVE
    const endpoint = process.env.NEXT_PUBLIC_BASE

    if (!endpoint) {
        console.log('please provide the socket endpoint')
    }

    useEffect(() => {

        if (chat_list){
            const new_list = chat_list.filter((item:ChatListType)=>{
    
                return(
                    item.text.toLowerCase().includes(filter_msg.toLowerCase())
                )
            })

            console.log(new_list.length)

            setFiltered_chat_list(new_list)            
        }

    }, [filter_msg, loading_2])

    useEffect(() => {

        const selected_chat = sessionStorage.getItem('s-c')
        if (selected_chat) {
            setLoading_2(!loading_2)
        }
        if (!selected_chat) {
            setLoading_2(!loading_2)
        }
        if (!receiver_img) {
            setReceiver_img(sessionStorage.getItem('p-i') || '/default-male.png')
        }
    }, [loading_2])

    // working with sockets...
    useEffect(() => {
        const socket = io(endpoint);
        const user_id = user_information?.role === 'patient' ? user_information?.patient_id : user_information?.physician_id;

        if (user_id) {
            socket.on(user_id, (data: ReceiverChatResponseType) => {
                if (data.statusCode === 200) {
                    const res: ChatListType = data.chat.data;
                    const new_data = {
                        appointment_id: res.appointment_id,
                        patient_id: res.patient_id,
                        is_patient: res.is_patient,
                        physician_id: res.physician_id,
                        is_physician: res.is_physician,
                        text: res.text,
                        media: res.media,
                        idempotency_key: res.idempotency_key,
                        createdAt: res.createdAt,
                        updatedAt: res.updatedAt,
                        date: res.date,
                    };

                    // Update chat_list (source of truth)
                    // setChat_list((prev:ChatListType[] ) => [...prev, new_data]);

                    // Update filtered_chat_list only if the new message matches the filter
                    if (new_data.text.toLowerCase().includes(filter_msg.toLowerCase())) {
                        setFiltered_chat_list((prev: ChatListType[]) => [...prev, new_data]);
                    }
                } else {
                    console.log('Socket emit error:', data);
                }
            });

            // Cleanup socket on component unmount
            return () => {
                socket.off(user_id);
                socket.disconnect();
            };
        }
    }, [user_information, filter_msg, setChat_list]);

    function handle_submit(e: React.FormEvent) {
        e.preventDefault();
        const socket = io(endpoint);

        const appointment_id = sessionStorage.getItem('a-pp');
        const patient_id = user_information ? user_information.patient_id : '';
        const physician_id = user_information ? user_information.physician_id : '';
        const token = localStorage.getItem('x-id-key');

        const text_data = {
            appointment_id,
            patient_id,
            is_patient: user_information?.role === 'patient',
            physician_id,
            is_physician: user_information?.role === 'physician',
            text: message,
            token,
            media: [],
            idempotency_key: 'fd6e5c9d-8729-4d7e-b847-17d4f5f491jd',
        };

        socket.emit('send-chat-text', text_data, (response: ChatResponseType) => {
            
            if (response.statusCode === 200) {
                setMessage('');
                const res: ChatListType = response.chat.data;

                // Update chat_list (source of truth)
                // setChat_list((prev: ChatListType[]) => [...prev, res]);

                // Update filtered_chat_list only if the message matches the filter
                if (res.text.toLowerCase().includes(filter_msg.toLowerCase())) {
                    setFiltered_chat_list((prev: ChatListType[]) => [...prev, res]);
                }
            } else {
                console.log('Error sending chat:', response.message);
            }
        });
    }

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
                    
                    <button className="lg:hidden bg-gray-100 hover:bg-gray-100/50 duration-200 h-[40px] md:px-5 rounded-full text-[12px] py-2.5 " onClick={()=> setShow_list(!show_list)}>cancel</button>
                    
                    
                </span>
            </div>}

            <div className={`w-full ${selected_user ? 'h-[calc(100vh-265px)]':'h-[calc(100vh-200px)]'} bg-white flex flex-col py-3.5 rounded-sm justify-between ` }>
            
                { filtered_chat_list.length == 0 ?

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
                                    <Loader2Icon className='size-8 animate-spin text-[#306ce9]' />
                                </div> }
                            
                            {
                                filtered_chat_list.map((msg,ind)=>{
                                    const {is_patient, is_physician, date, updatedAt} = msg

                                    const user_role = user_information?.role
                                    const sender = is_patient ? 'patient' : 'physician'

                                    const sender_dir = (user_role == sender) ? 'justify-end':'justify-start'
                                    const sender_box_color = (user_role == sender) ? 'bg-[#306ce9] text-white':'bg-[#306ce9]/70 text-white'
                                    const prevSender = ind > 0 ? filtered_chat_list[ind - 1].is_patient : null;
                                    const additionalSpacing = ind > 0 && is_patient !== prevSender ? 'mt-4' : 'mt-2';
                                    const unix_date_time = Math.floor(new Date(updatedAt).getTime() / 1000)
                                    const date_time = format_date_from_unix(Number(unix_date_time))

                                    return(
                                        <div key={ind} className={`w-full flex ${sender_dir} ${additionalSpacing} `} onClick={()=> console.log(msg)}>
                                            <div key={ind} className={`flex items-start gap-3 min-w-auto w-[80%]  lg:max-w-[75%] 2xl:max-w-[60%] `}>
                                                {(user_role != sender) && <span className="h-[35px] w-[35px] rounded-full relative overflow-hidden">
                                                    <Image src={receiver_img || '/default-male.png'} alt={''} fill className="object-cover" />
                                                </span>}
                                                <div className={`p-2 rounded-b-sm flex-1  ${sender_box_color}`}>
                                                    <p className="text-[12px]">{msg.text}</p>
                                                    <p className="text-[10px] w-full text-end mt-1">{date_time.time}</p>
                                                </div>
                                                {(user_role == sender) && <span className="h-[35px] w-[35px] rounded-full relative overflow-hidden">
                                                    <Image src={user_information?.avatar || 'default-male.png' } alt={''} fill className="object-cover" />
                                                </span>}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                </ScrollToBottom>}
                


            </div>

            <form onSubmit={handle_submit} className="w-full h-[50px] flex items-center justify-start bg-[#f2f2f2] rounded-sm">
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

                {<button type='submit' onClick={handle_submit} className="h-full w-15 flex items-center justify-center">
                    <IoSend size={'18px'} className={`cursor-pointer duration-300 ${message ? "text-[#306ce9]": "text-gray-600"} `}/>
                </button>}
            </form>
        </div>
    );
};

export default SelectedChat;