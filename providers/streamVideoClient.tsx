'use client'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk'
import React, { ReactNode, useEffect, useState } from 'react'
import { Loader2Icon } from 'lucide-react'
import { useChat } from '@/app/context/ChatContext'
import { tokenProvider } from '@/actions/stream.actions'
import { toast_msg } from '@/lib/toast'

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>()
    const { user_information } = useChat()

    const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

    useEffect(() => {
        if (user_information == null || !apiKey) {
            toast_msg({title: 'Missing user information or Stream API key', type: 'danger'})
            return
        }

        const id = (user_information.role === 'patient' ? user_information.patient_id : user_information.physician_id) || '0001'
        const name = user_information.first_name || 'Unknown User' 
        const image = user_information?.avatar || '' 

        const client = new StreamVideoClient({
            apiKey: apiKey,
            user: {
                id,
                name: name,
                image: image,
            },
            tokenProvider: () => tokenProvider(id), 
        })

        setVideoClient(client)

        // Cleanup on unmount
        return () => {
            client.disconnectUser()
        }
    }, [user_information, apiKey])

    if (!videoClient) {
        return (
        <div className="w-full h-full flex items-center justify-center">
            <Loader2Icon className="animate-spin size-8" />
        </div>
        )
    }

    return <StreamVideo client={videoClient}>{children}</StreamVideo>
}

export default StreamVideoProvider