'use client'
import React from 'react'
import DashboardNav from '@/components/dashboard_nav'
import DashboardPage from '@/pages/dashboard_page'

const Dashboard = () => {
    return (
        <div className="w-full h-full flex flex-col bg-white overflow-y-auto">
            <div className="w-full">
                <DashboardNav />
                <DashboardPage />
            </div>
        </div>
    )
}

export default Dashboard