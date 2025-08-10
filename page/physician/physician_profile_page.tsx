'use client'
import React from 'react'
import PhysicianProfileComponent from '@/components/physician_profile'

const PhysicianProfilePage = () => {

    return (
        <div className="w-full min-h-[calc(100vh-70px)] bg-gray-50 p-5 hide-scrollbar flex flex-col gap-5">
            <PhysicianProfileComponent />

        </div>
    )
}

export default PhysicianProfilePage