'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RiSearchLine, RiAttachment2 } from 'react-icons/ri';
import { toast_msg } from '@/lib/toast';
import {messages_data} from '@/constants'
import { format_date_from_unix, get_time_from_unix } from '@/lib/date_formater';
import { IoSend,IoClose } from "react-icons/io5";
import { useChat } from '@/app/context/ChatContext';
import { Skeleton } from './ui/skeleton';
import { AppointmentType } from '@/types';
import { Loader2Icon } from 'lucide-react';


interface ChatListProps{
    loading: boolean;
    setLoading: (loading:boolean)=> void;
    loading_2: boolean;
    setLoading_2: (loading_2:boolean)=> void;
    physician_img: string;
    setPhysician_img: (physician_img: string) => void;
}


const ChatList = ({loading, setLoading, loading_2, setLoading_2, setPhysician_img, physician_img}:ChatListProps) => {
    const [filter_appointment, setFilter_appointment] = useState('')
    const [selected, setSelected] = useState(0)
    const [show_list, setShow_list] = useState(false)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(messages_data);
    const messagesContainerRef = useRef<HTMLDivElement>(null); // Renamed for clarity
    const {setShow_selected_chat, show_selected_chat, user_information, selected_appointment_info, setSelected_appointment_info, appointment_info, chat_list, setSelected_user, selected_user} = useChat()
    const [filtered_appointments, setFiltered_appointments] = useState<AppointmentType[]>([])


    useEffect(() => {

        // Scroll to bottom of the messages container
        messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    useEffect(() => {

        const selected_chat = sessionStorage.getItem('c-ind')

        if (selected_chat) {
            setSelected(Number(selected_chat))
        }else{
            setSelected(-1)
        }

        const new_list = appointment_info.filter((item:AppointmentType)=>{

            return(
                item.status.toLowerCase().includes(filter_appointment.toLowerCase()) 
            )

        })

        setFiltered_appointments(new_list)
    
    }, [filter_appointment, loading])

    
    function handle_select_chat(data:AppointmentType, ind:number){

        const user_role = data.patient.patient_id ? "patient" : "physician"
        if (user_information?.role == 'patient') {
            setSelected_user({...selected_user, ...data.physician, role: 'physician' })
        }else if(user_information?.role == 'physician'){
            setSelected_user({...selected_user, ...data.patient, role: user_role})
        }
        const {avatar} = data.physician
        setShow_selected_chat(!show_selected_chat); 
        setSelected(1); 
        setSelected_appointment_info(data); 
        setPhysician_img(avatar || '/default-male.png')

        setLoading_2(!loading_2)

        const {patient, physician, appointment_id} = data

        sessionStorage.setItem('c-ind', ind.toString())

        setSelected(ind)

        sessionStorage.setItem('s-c', `${patient.patient_id}/${physician.physician_id}`)

        sessionStorage.setItem('p-i', `${physician.avatar}`)
    }

    return (
        <>
            <div className="hidden lg:flex flex-col gap-3  w-full h-full justify-start ">
                <h3 className="font-mont font-semibold text-[15.5px]  text-slate-700">{(user_information && user_information.role == 'physician') ? "Patients":"Physicians"}</h3>

                <div className="w-full">
                    {
                        !filtered_appointments.length ?
                        <div className=" w-[calc(100%-39px)] mx-auto  flex h-[calc(100vh-220px)] rounded-lg p-5 items-center justify-center relative">
                                <p className="text-[13px] text-gray-600 text-center py-2">{!loading && "No consultation at this time."}</p>

                                {loading && 
                                <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                    <Loader2Icon className='size-8 animate-spin text-gray-500' />
                                </div> }
                            </div>
                            :
                            <div className="w-full overflow-y-auto max-h-[calc(100vh-145px)] flex flex-col gap-2 hide-scrollbar ">
                                {loading && 
                                    <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                        <Loader2Icon className='size-8 animate-spin text-gray-500' />
                                    </div> }
                                    
                                    
                                        {
                                            filtered_appointments.map((data: AppointmentType, ind: number)=>{

                                                const {patient, physician, last_message, time, last_message_time, appointment_id } = data

                                                const item = sessionStorage.getItem('s-c')

                                                const item_array = item && item.split('/')

                                                const get_appt_id = item_array && item_array[item_array.length - 1]

                                                const {avatar} = physician

                                                const display_name = user_information?.role == 'patient' ? `${physician.first_name} ${physician.last_name}`: `${patient.first_name} ${patient.last_name}`

                                                const display_img = user_information?.role == 'patient' ? `${physician.avatar}` : `${patient.avatar}`

                                                const date_time = format_date_from_unix(Number(time))

                                                const last_msg_time = !last_message_time && format_date_from_unix(Number(last_message_time))

                                                const selected_chat = selected == ind ? 'bg-[#306ce9] text-white border-[#306ce9]  ' : 'bg-white hover:bg-[#306ce9] border-gray-100  duration-200 hover:text-white '

                                                const selected_chat_text = selected == ind ? "text-slate-200":"text-gray-500 group-hover:text-slate-200"

                                                const selected_chat_msg_count = selected == ind ? "bg-blue-400":"bg-[#f2f2f2] group-hover:bg-blue-400"

                                                return(
                                                    <div key={ind} className={`w-full h-[80px] sm:h-[90px] ${selected_chat}   rounded-sm shadow-sm border p-2 sm:p-3 font-mont flex items-center justify-start gap-2 group cursor-pointer`} onClick={()=>handle_select_chat(data, ind) }>
                                                        <div className=" h-full flex items-start">
                                                            <span className="h-[50px] w-[50px] relative overflow-hidden rounded-full">
                                                                <Image src={display_img} alt='' fill objectFit='cover'  />
                                                            </span>
                                                        </div>

                                                        <span className="flex-1 h-full flex flex-col justify-center items-start gap-1 sm:gap-2">
                                                            <p className="text-[13px] font-medium">{display_name}</p>
                                                            <p className={`text-[12px] h-[35px] w-full line-clamp-2 ${selected_chat_text} duration-200`}>
                                                                {last_message}
                                                            </p>
                                                        </span>

                                                        <span className="w-[60px] flex flex-col h-full items-end justify-between">
                                                            <p className="text-[12px]">{last_msg_time && last_msg_time.time}</p>
                                                            {/* <p className={`text-[10px] w-[30px] text-center py-0.5 rounded-full duration-200 ${selected_chat_msg_count} `}>{"12"}</p> */}
                                                        </span>
                                                    </div>
                                                )
                                            })
                                        }
                                

                            </div>
                    }
                </div>

            </div>

            <div className="w-full block lg:hidden">
                {
                    show_list ?
                        <div className=" flex flex-col gap-3  w-full h-full justify-start ">
                            <h3 className="font-mont font-semibold text-[15.5px]  text-slate-700">{true ? "Patients":"Physicians"}</h3>

                            <div className="w-full  overflow-y-auto max-h-[calc(100vh-145px)]  hide-scrollbar ">

                                <div className="w-full flex flex-col gap-2.5 lg:gap-1.5">
                                    {
                                        [1,2,3,4,5,6,7,8,9,0].map((data,ind)=>{
                                            const selected_chat = ind == selected ? 'bg-[#306ce9] text-white  ' : 'bg-white hover:bg-[#306ce9] duration-200 hover:text-white border-gray-200 '

                                            const selected_chat_text = ind == selected ? "text-slate-200":"text-gray-500 group-hover:text-slate-200"

                                            const selected_chat_msg_count = ind == selected ? "bg-blue-400":"bg-[#f2f2f2] group-hover:bg-blue-400"

                                            return(
                                                <div key={ind} className={`w-full h-[80px] sm:h-[90px] border shadow-xs ${selected_chat}   rounded-sm  p-2 sm:p-3 font-mont flex items-center justify-start gap-2 group cursor-pointer`} onClick={()=> {setShow_selected_chat(!show_selected_chat); setSelected(ind); setShow_list( !show_list) } }>
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
                        <div className=" w-full h-full bg-white rounded-sm p-4 flex flex-col items-start justify-between gap-2 shadow-md">
                            {loading_2 && <div className=" w-full flex items-center justify-between max-md:justify-end border-b border-[#f2f2f2] pb-3">
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
                                    <button className=" h-[40px] px-5 rounded-full bg-gray-200 hover:bg-gray-200/70 duration-200 text-[13px] text-gray-700" onClick={()=> setShow_list(!show_list)}>Cancel</button>

                                    <button className="bg-[#306ce9] h-[40px] px-5 rounded-full text-white text-[13px] py-2.5">Start Consultation</button>
                                </span>
                            </div>}

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