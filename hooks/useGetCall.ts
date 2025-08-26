'use client'
import { useEffect, useState } from "react"
import {Call, useStreamVideoClient} from "@stream-io/video-react-sdk"
import {useChat} from "@/app/context/ChatContext"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([])
    const [is_loading, setIs_loading] = useState(false)
    const client = useStreamVideoClient()
    const {user_information} = useChat()


    useEffect(() => {
        let isMounted = true;
    
        const load_calls = async () => {
            if (!client || !user_information) return;
    
            setIs_loading(true);

            const user_id = user_information.role === 'patient' ? user_information.patient_id : user_information.physician_id
    
            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user_id },
                            { members: { $in: [user_id] } },
                        ],
                    },
                });
    
                if (isMounted) {
                    setCalls(calls);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching calls:", error);
                }
            } finally {
                if (isMounted) {
                    setIs_loading(false);
                }
            }
        };
    
        load_calls();
    
        return () => {
            isMounted = false;
        };
    }, [client, user_information]);
    
    const now = new Date()

    const ended_calls = calls.filter(({state: {startsAt, endedAt}}: Call) => {
        return (startsAt && new Date(startsAt) < now || !!endedAt )
    }) ;
    const upcoming_calls = calls.filter(({state: {startsAt}}: Call) =>{
        return (startsAt && new Date(startsAt) > now)
    })
    
    const todays_upcoming_calls = calls.filter(({ state: { startsAt } }: Call) => {
        if (!startsAt) return false;
    
        const startDate = new Date(startsAt);
    
        return (
            startDate > now &&
            startDate.getDate() === now.getDate() &&
            startDate.getMonth() === now.getMonth() &&
            startDate.getFullYear() === now.getFullYear()
        );
    });
    
    

    return {
        ended_calls, 
        upcoming_calls, 
        call_recordings: calls,
        todays_upcoming_calls,
        is_loading
    }
}