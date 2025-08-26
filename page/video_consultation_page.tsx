'use client'
import React, { useState } from 'react'
import { useChat } from '@/app/context/ChatContext'
import Image from 'next/image'
import { format_date_from_unix,  } from '@/lib/date_formater';
import { PageHeader } from '@/components/reuseable_heading_component';
import { Loader2Icon } from 'lucide-react'
import { useStreamVideoClient, Call } from '@stream-io/video-react-sdk';
import { toast_msg } from '@/lib/toast';
import { useRouter } from 'next/navigation';

const VideoConsultationPage = () => {
    const router = useRouter()
    const {selected_appointment_info, user_information} = useChat()
    const [loading, setLoading] = useState(false)
    const client = useStreamVideoClient()
    const [call_details, setCall_details] = useState<Call>()
    const [values, setValues] = useState({
        datetime: new Date(),
        description: '',
        link: ''
    })

    if (!selected_appointment_info) {
        router.push('/consultation')
        return;
    }


    const image = user_information?.role == 'patient' ? selected_appointment_info?.physician.avatar : selected_appointment_info?.patient.avatar;
    const first_name = user_information?.role == 'patient' ? selected_appointment_info?.physician.first_name : selected_appointment_info?.patient.first_name;
    const last_name = user_information?.role == 'patient' ? selected_appointment_info?.physician.last_name : selected_appointment_info?.patient.last_name;
    const gender = user_information?.role == 'patient' ? selected_appointment_info?.physician.gender : selected_appointment_info?.patient.gender;
    const registered_as = user_information?.role == 'patient' && selected_appointment_info?.physician.registered_as 
    const specialty = user_information?.role == 'patient' && selected_appointment_info?.physician.specialty
    const country = user_information?.role == 'patient' ? selected_appointment_info?.physician.country : selected_appointment_info?.patient.country;
    const languages_spoken = user_information?.role == 'patient' ? selected_appointment_info?.physician.languages_spoken : selected_appointment_info?.patient.languages_spoken;
    const bio = user_information?.role == 'patient' && selected_appointment_info?.physician.bio 
    const date_time = format_date_from_unix(Number(selected_appointment_info?.time));

    // const handle_submit: React.FormEventHandler<HTMLButtonElement> = async(e)=>{
    //     e.preventDefault()
    //     if (!client || !user_information) return;
    //     setLoading(true)
    //     try {
    //         console.log(1)
    //         const meeting_id = selected_appointment_info.meeting_id || crypto.randomUUID();
    //         const call = client.call('default', meeting_id)

    //         if (!call) throw new Error("Failed to create call");
    //         console.log(2, meeting_id, call)
            
    //         const startsAt = values.datetime.toISOString() || new Date(Date.now()).toISOString()

    //         const description = values.description || 'Instant meeting'

    //         console.log(3, startsAt, description)

    //         await call.getOrCreate({
    //             data: {
    //                 starts_at: startsAt,
    //                 custom: {
    //                     description,
    //                 }
    //             }
    //         })

    //         setCall_details(call)
    //         console.log(444)

    //         if (!values.description) {
    //             setLoading(false)
    //             toast_msg({title: 'redirecting to meeting room', type: 'success'})
    //             console.log('meeting id ... ',meeting_id,'\ncall id ... ',call.id)
    //             router.push(`/consultation/video-consultation/${call.id}`)
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
        
    // }

    const handle_submit: React.FormEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        if (!client || !user_information) return;
        setLoading(true);
        try {
            console.log(1);
            const meeting_id = selected_appointment_info.meeting_id || crypto.randomUUID();
            let call = client.call('default', meeting_id);

            // Query existing calls to check for a matching meeting_id
            const { calls } = await client.queryCalls({
                filter_conditions: {
                    id: meeting_id, // Exact match on meeting_id
                },
            });

            // If a call exists with the same ID, use it; otherwise, create a new one
            if (calls.length > 0) {
                call = calls[0]; // Use the existing call
                console.log(2, 'Existing meeting found', meeting_id, call);
            } else {
                console.log(2, 'Creating new meeting', meeting_id, call);
                const startsAt = values.datetime.toISOString() || new Date(Date.now()).toISOString();
                const description = values.description || 'Instant meeting';
                console.log(3, startsAt, description);

                await call.getOrCreate({
                    data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                    },
                });
            }

            setCall_details(call);
            console.log(444);

            if (!values.description) {
                setLoading(false);
                toast_msg({ title: 'Redirecting to meeting room', type: 'success' });
                console.log('Meeting ID ... ', meeting_id, '\nCall ID ... ', call.id);
                router.push(`/consultation/video-consultation/${call.id}`);
            }
        } catch (err) {
            console.log(err);
            setLoading(false); // Ensure loading is cleared on error
        }
        };

    return (
        <div className='p-3 sm:p-4 min-h-[calc(100vh-70px)] flex flex-col gap-3 w-full bg-gray-50 font-mont '>
            <PageHeader text={'Video Consultation'} />

            <div className='w-full bg-white p-3 sm:p-4 grid  lg:grid-cols-2 gap-4 shadow-md rounded-md'>
                <div className="col-span-1  relative gap-5 flex flex-col ">

                    <div className={`w-full min-h-[350px] relative  rounded-md `}>

                        <span className={`h-full w-full rounded-md `}>
                            <Image src={image} alt='' layout='fill' objectFit='cover' className='rounded-md'  />
                        </span>
                    </div>

                </div>

                <div className="col-span-1 h-full flex flex-col justify-start gap-3 ">
                    
                    <span className="w-full flex gap-2">
                        <p className="text-[13px] font-medium">Time:</p>
                        <p className="text-[13px]">{date_time.date}, {date_time.time}</p>
                    </span>
                    <span className="w-full flex gap-2">
                        <p className="text-[13px] font-medium">Name:</p>
                        <p className="text-[13px]">{first_name} {last_name}</p>
                    </span>
                    <span className="w-full flex gap-2">
                        <p className="text-[13px] font-medium">Gender:</p>
                        <p className="text-[13px]">{ gender }</p>
                    </span>
                    <span className="w-full flex gap-2">
                        <p className="text-[13px] font-medium">Registered As:</p>
                        <p className="text-[13px]">{registered_as }</p>
                    </span>
                    <span className="w-full flex gap-2">
                        <p className="text-[13px] font-medium">Specialty:</p>
                        <p className="text-[13px]">{specialty }</p>
                    </span>
                    <span className="w-full flex gap-2">
                        <p className="text-[13px] font-medium">Country:</p>
                        <p className="text-[13px]">{country }</p>
                    </span>
                    <span className="w-full flex gap-2">
                        <p className="text-[13px] font-medium">Languages:</p>
                        {
                            languages_spoken?.map((data, ind:number)=>{
                                return(
                                    <p key={ind} className="text-[13px]">{data},</p>
                                )
                            })
                        }
                    </span>
                    
                    <span className="w-full flex flex-col gap-2">
                        <p className="text-[13px] font-medium">Bio:</p>
                        <p className="text-[13px] leading-[25px]">{bio}</p>
                    </span>
                </div>
            </div>

            <span className="w-full flex items-center justify-center">
                <button className={`h-[45px] sm:h-[50px] rounded-full cursor-pointer duration-300 bg-[#306ce9] hover:bg-[#306ce9]/90 text-white text-[13px] w-[175px] md:w-[200px] flex items-center justify-center `} onClick={handle_submit} disabled={loading}>
                    {loading ? <Loader2Icon className="animate-spin size-5 sm:size-7 " /> : `${false ? 'Join Meeting' : 'Start Meeting'}`}
                </button>
            </span>

        </div>
    )
}

export default VideoConsultationPage