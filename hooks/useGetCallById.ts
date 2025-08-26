'use client';
import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useChat } from '@/app/context/ChatContext';

export const useGetCallById = (id: string | string[]) => {
    const { user_information } = useChat();
    const [call, setCall] = useState<Call | undefined>(undefined);
    const [is_call_loading, setIs_call_loading] = useState(true);
    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client) {
            console.log('Client not available, skipping call load');
            return;
        }

        const loadCall = async () => {
            console.log(2.1, 'Client: ', client, '\nID: ', id);
            setIs_call_loading(true); // Reset loading state on new attempt
            try {
                const filterConditions = {
                    id: Array.isArray(id) ? { $in: id } : id, // Handle single ID or array
                };
                const { calls } = await client.queryCalls({ filter_conditions: filterConditions });

                console.log(2.2, 'Calls retrieved:', calls);

                if (calls.length > 0) {
                    setCall(calls[0]);
                } else {
                    console.log('No calls found for ID:', id);
                }

                console.log(2.3, 'Final calls state:', calls);
            } catch (error) {
                console.log('Error loading call:', error);
            } finally {
                setIs_call_loading(false); // Ensure loading state is cleared
            }
        };

        console.log(4, 'ID parameter:', id);
        loadCall();
    }, [client, id]); // Re-run when client or id changes

    return { call, is_call_loading };
};