'use client'
import React from 'react'
import DashboardNav from '@/components/dashboard_nav'
import DashboardBody from '@/pages/dashboard_body'

const Dashboard = () => {
    return (
        <div className="w-full h-full flex flex-col bg-white overflow-y-auto">
            <div className="w-full">
                <DashboardNav />
                <DashboardBody />
            </div>
        </div>
    )
}

export default Dashboard