'use client'
import React from 'react'
import DashboardNav from '@/components/dashboard_nav'
import SettingsPage from '@/pages/settings_page'

const Settings = () => {
    return (
        <div  className='w-full h-full flex flex-col bg-white overflow-y-auto'>
            <div className="w-full">
                <DashboardNav />

                <SettingsPage />
            </div>
        </div>
    )
}

export default Settings