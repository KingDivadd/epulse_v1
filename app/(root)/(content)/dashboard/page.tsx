'use client'
import React from 'react'
import Navbar from '@/components/navbar'
import DashboardPage from '@/page/dashboard_page'
import AdminDashboardPage from '@/page/physician_dashboard_page'
import Loader from '@/page/loader'

import { useChat } from '@/app/context/ChatContext'



const Dashboard = () => {
    const {user_information} = useChat()
    
    
    return (
        <div className="w-full h-full flex flex-col bg-white overflow-y-auto">
            <div className="w-full">
                <Navbar />
                
                <div className="w-full">
                    {
                        user_information ? 
                        <>
                            {
                                user_information.role == 'patient' ? <DashboardPage /> : <AdminDashboardPage />
                            }
                        
                        </>
                        :
                        <Loader />
                    }
                </div>

                
            </div>
        </div>
    )
}

export default Dashboard