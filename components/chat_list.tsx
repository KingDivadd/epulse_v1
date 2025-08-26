'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RiSearchLine, RiAttachment2, RiChat4Line, RiVideoOnLine  } from 'react-icons/ri';
import { toast_msg } from '@/lib/toast';
import {messages_data} from '@/constants'
import { format_date_from_unix, get_time_from_unix } from '@/lib/date_formater';
import { IoSend,IoClose } from "react-icons/io5";
import { useChat } from '@/app/context/ChatContext';
import { Skeleton } from './ui/skeleton';
import { AppointmentType } from '@/types';
import { Loader2Icon } from 'lucide-react';
import SelectedChat from './selected_chat';
import { BiVideo } from "react-icons/bi";
import { useRouter } from 'next/navigation';

interface ChatListProps{
    loading: boolean;
    setLoading: (loading:boolean)=> void;
    loading_2: boolean;
    setLoading_2: (loading_2:boolean)=> void;
    receiver_img: string;
    setReceiver_img: (receiver_img: string) => void;
    show_list: boolean;
    setShow_list: (show_list:boolean)=>void;
    typing: boolean;
    setTyping: (typing:boolean)=>void;
    typing_receiver_id: string;
    setTyping_receiver_id: (typing_receiver_id:string)=>void;
}


const ChatList = ({loading, setLoading, loading_2, setLoading_2, setReceiver_img, receiver_img, show_list, setShow_list, typing, setTyping, typing_receiver_id,setTyping_receiver_id }:ChatListProps) => {
    const [filter_appointment, setFilter_appointment] = useState('')
    const [selected, setSelected] = useState('')
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(messages_data);
    const messagesContainerRef = useRef<HTMLDivElement>(null); // Renamed for clarity
    const {setShow_selected_chat, show_selected_chat, user_information, selected_appointment_info, setSelected_appointment_info, appointment_info, chat_list, setSelected_user, selected_user} = useChat()
    const [filtered_appointments, setFiltered_appointments] = useState<AppointmentType[]>([])
    const router = useRouter()


    useEffect(() => {

        // Scroll to bottom of the messages container
        messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    useEffect(() => {

        const selected_chat = sessionStorage.getItem('c-ind')

        if (selected_chat) {
            setSelected(selected_chat)
        }else{
            // setSelected(-1)
        }


        const new_list = appointment_info.filter((item:AppointmentType)=>{
            const {patient, physician, } = item

            const display_name = user_information?.role == 'patient' ? `${physician.first_name} ${physician.last_name}`: `${patient.first_name} ${patient.last_name}`

            return(
                item?.physician?.specialty?.toLowerCase().includes(filter_appointment.toLowerCase()) ||
                display_name.toLowerCase().includes(filter_appointment.toLowerCase())
            )

        })

        setFiltered_appointments(new_list)
    
    }, [filter_appointment, loading])

    
    function handle_select_chat(data:AppointmentType, ind:number){


        if (data.appointment_type.toLowerCase() == 'video_call' ){

            sessionStorage.setItem('c-ind', data.appointment_id)

            setSelected(data.appointment_id)

            setSelected_appointment_info(data);

            router.push(`/consultation/video-consultation`);

            return;

        }


        const user_role = data.patient.patient_id ? "patient" : "physician"

        if (user_information?.role == 'patient') {

            setSelected_user({...selected_user, ...data.physician, role: 'physician' })
            setReceiver_img(data.physician.avatar || '/default-male.png')

            sessionStorage.setItem('p-i', `${data.physician.avatar}`)
        }else if(user_information?.role == 'physician'){

            setSelected_user({...selected_user, ...data.patient, role: user_role})
            setReceiver_img(data.patient.avatar || '/default-male.png')

            sessionStorage.setItem('p-i', `${data.patient.avatar}`)
        }

        setShow_list(!show_list)

        setShow_selected_chat(!show_selected_chat);


        setSelected_appointment_info(data);

        setLoading_2(true)

        const {patient, physician, appointment_id} = data

        sessionStorage.setItem('c-ind', appointment_id)

        setSelected(appointment_id)

        sessionStorage.setItem('s-c', `${patient.patient_id}/${physician.physician_id}`)

        sessionStorage.setItem('a-pp', data.appointment_id)
    }

    return (
        <>
            <div className="hidden lg:flex flex-col gap-3  w-full h-full justify-start ">
                <span className="h-[40px] w-full">
                    <input type="text" className="input-type text-[12px] rounded-full" onChange={(e)=> setFilter_appointment(e.target.value)} placeholder={`search for participants...`} />
                </span>
                

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
                        <div className="w-full overflow-y-auto max-h-[calc(100vh-145px)] flex flex-col  hide-scrollbar ">
                            {loading && 
                                <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                    <Loader2Icon className='size-8 animate-spin text-gray-500' />
                                </div> }
                                
                                
                                    {
                                        filtered_appointments.map((data: AppointmentType, ind: number)=>{

                                            const {patient, physician, last_message, time, last_message_time, appointment_id, appointment_type } = data

                                            const user_specialty = physician ? ( physician.registered_as == 'Specialist') ? physician.specialty : physician.registered_as == 'General Doctor' ? 'General Doctor' : '' : ''

                                            const item = sessionStorage.getItem('s-c')

                                            const item_array = item && item.split('/')

                                            const get_appt_id = item_array && item_array[item_array.length - 1]

                                            const {avatar} = physician

                                            const display_name = user_information?.role == 'patient' ? `${physician.first_name} ${physician.last_name}`: `${patient.first_name} ${patient.last_name}`

                                            const display_img = user_information?.role == 'patient' ? `${physician.avatar}` : `${patient.avatar}`

                                            const receiver_user = user_information?.role == 'patient' ? physician.physician_id == typing_receiver_id : patient.patient_id == typing_receiver_id

                                            const date_time = format_date_from_unix(Number(time))

                                            const last_msg_time = !last_message_time && format_date_from_unix(Number(last_message_time))

                                            const selected_chat = selected == data?.appointment_id ? 'bg-[#306ce9] text-white border border-[#306ce9]  ' : ' hover:bg-[#306ce9] border-b border-gray-300 last:border-0 duration-200 hover:text-white '

                                            const selected_chat_text = selected == data?.appointment_id ? "text-slate-200":"text-gray-500 group-hover:text-slate-200"

                                            const selected_chat_msg_count = selected == data?.appointment_id ? "bg-blue-400":"bg-[#f2f2f2] group-hover:bg-blue-400"

                                            return(
                                                <div key={ind} className={`w-full h-[75px] ${selected_chat} p-2 sm:p-3 font-mont flex items-center justify-start gap-2 group cursor-pointer`} onClick={()=>handle_select_chat(data, ind) }>
                                                    <div className=" h-full flex items-start">
                                                        <span className="h-[50px] w-[50px] relative overflow-hidden rounded-full">
                                                            <Image src={display_img} alt='' fill objectFit='cover'  />
                                                        </span>
                                                    </div>

                                                    <span className="flex-1 h-full flex flex-col justify-center items-start gap-1 ">
                                                        <p className="text-[13px] font-medium">{display_name}</p>
                                                        <p className={`text-[12px] h-[35px] w-full line-clamp-2 ${selected_chat_text} duration-200`}>
                                                            {receiver_user ? "Typing" : user_specialty}
                                                        </p>
                                                    </span>

                                                    <span className="w-[20px] flex flex-col h-full items-end justify-between">
                                                        {appointment_type.toLowerCase() == 'chat' ? <RiChat4Line className={selected_chat} />:
                                                        <BiVideo  className={selected_chat} size={19} />}
                                                        
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
                            <span className="h-[40px] w-full">
                                <input type="text" className="input-type text-[12px] rounded-full" onChange={(e)=> setFilter_appointment(e.target.value)} placeholder={`search for participants...`} />
                            </span>

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
                                <div className="w-full overflow-y-auto max-h-[calc(100vh-145px)] flex flex-col hide-scrollbar ">
                                    {loading && 
                                        <div className="absolute w-full mx-auto h-full flex items-center justify-center">
                                            <Loader2Icon className='size-8 animate-spin text-gray-500' />
                                        </div> }
                                        
                                        
                                            {
                                                filtered_appointments.map((data: AppointmentType, ind: number)=>{

                                                    const {patient, physician, last_message, time, last_message_time,  appointment_type} = data

                                                    const user_specialty = physician ? ( physician.registered_as == 'Specialist') ? physician.specialty : physician.registered_as == 'General Doctor' ? 'General Doctor' : '' : ''

                                                    const item = sessionStorage.getItem('s-c')

                                                    const item_array = item && item.split('/')

                                                    const get_appt_id = item_array && item_array[item_array.length - 1]

                                                    const {avatar} = physician

                                                    const display_name = user_information?.role == 'patient' ? `${physician.first_name} ${physician.last_name}`: `${patient.first_name} ${patient.last_name}`

                                                    const display_img = user_information?.role == 'patient' ? `${physician.avatar}` : `${patient.avatar}`

                                                    const date_time = format_date_from_unix(Number(time))

                                                    const last_msg_time = !last_message_time && format_date_from_unix(Number(last_message_time))

                                                    const selected_chat = selected == data?.appointment_id ? 'bg-[#306ce9] text-white border border-[#306ce9]  ' : ' hover:bg-[#306ce9] border-b border-gray-300 last:border-0 duration-200 hover:text-white '

                                                    const selected_chat_text = selected == data?.appointment_id ? "text-slate-200":"text-gray-500 group-hover:text-slate-200"

                                                    const selected_chat_msg_count = selected == data?.appointment_id ? "bg-blue-400":"bg-[#f2f2f2] group-hover:bg-blue-400"

                                                    const receiver_user = user_information?.role == 'patient' ? physician.physician_id == typing_receiver_id : patient.patient_id == typing_receiver_id


                                                    return(
                                                        <div key={ind} className={`w-full h-[67.5px] ${selected_chat} p-2 sm:p-3 font-mont flex items-center justify-start gap-2 group cursor-pointer`} onClick={()=>handle_select_chat(data, ind) }>
                                                            <div className=" h-full flex items-start">
                                                                <span className="h-[50px] w-[50px] relative overflow-hidden rounded-full">
                                                                    <Image src={display_img} alt='' fill objectFit='cover'  />
                                                                </span>
                                                            </div>

                                                            <span className="flex-1 h-full flex flex-col justify-center items-start gap-1 sm:gap-2">
                                                                <p className="text-[13px] font-medium">{display_name}</p>
                                                                <p className={`text-[12px] h-[35px] w-full line-clamp-2 ${selected_chat_text} duration-200`}>
                                                                    {receiver_user ? "Typing...": user_specialty}
                                                                </p>
                                                            </span>

                                                            <span className="w-[20px] flex flex-col h-full items-end justify-between">
                                                                {appointment_type.toLowerCase() == 'chat' ? <RiChat4Line className={selected_chat} />:
                                                                <BiVideo  className={selected_chat} size={19} />}
                                                                
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                    

                                </div>
                            }

                        </div>
                        :
                        <div className=" w-full h-full">
                            <SelectedChat loading_2={loading_2} receiver_img={receiver_img} setReceiver_img={setReceiver_img} setLoading_2={setLoading_2} setShow_list={setShow_list} show_list={show_list} typing={typing} setTyping={setTyping}  typing_receiver_id={typing_receiver_id} setTyping_receiver_id={setTyping_receiver_id} />
                        </div>
                }
            </div>

        </>
    )
}

export default ChatList