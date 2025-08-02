'use client'
import React, {useState, useEffect} from 'react'
import Navbar from '@/components/navbar'
import DashboardPage from '@/page/dashboard_page'
import AdminDashboardPage from '@/page/physician_dashboard_page'
import LoadingDashboard from '@/page/skeleton/loading_dashboard'
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
                        <LoadingDashboard />
                    }
                </div>

                
            </div>
        </div>
    )
}

export default Dashboard