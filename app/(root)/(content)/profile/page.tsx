'use client'
import React from 'react'
import Navbar from '@/components/navbar'
import PhysicianProfilePage from '@/page/physician/physician_profile_page'
import { useChat } from '@/app/context/ChatContext'
import PatientProfile from '@/page/patient_profile'
import LoadingSettings from '@/page/skeleton/loading_settings'


const Profile = () => {
    const {user_information} = useChat()
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <Navbar />

                
                <div className="w-full">
                    {
                        user_information ? 
                        <>
                            {
                                user_information.role == 'patient' ? <PatientProfile /> :<PhysicianProfilePage />
                            }
                        
                        </>
                        :
                        <LoadingSettings />
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile