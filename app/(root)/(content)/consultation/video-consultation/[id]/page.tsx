// 'use client'
// import { StreamTheme, StreamCall } from '@stream-io/video-react-sdk'
// import { usePathname } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import Meeting_room from '@/components/meeting_room'
// import Meeting_setup from '@/components/meeting_setup'
// import {getCallById} from '@/hooks/useGetCallById'
// import { Loader2Icon } from 'lucide-react'
// import {useChat} from '@/app/context/ChatContext'
// import { toast_msg } from '@/lib/toast'

// const Meeting = () => {
//     const path = usePathname()
//     const {user_information} = useChat()
//     const [is_setup_complete, setIs_setup_complete] = useState(false)

//     const split_path = path.split('/')

//     const {call, is_call_loading} = getCallById(split_path[split_path.length - 1])

//     if (!user_information) toast_msg({title: 'user information not found'})

//     if (is_call_loading) console.log('is call loading ... ', call, is_call_loading)

//     if (!user_information || is_call_loading) return <div className="w-full h-full flex items-center justify-center">
//         <Loader2Icon className={'animate-spin size-8 text-red-500'} />
//     </div>


//     return (
//         <main className="bg-[#161925] text-white w-full h-screen">
//             <StreamCall call={call}>
//                 <StreamTheme>
//                     {is_setup_complete ? 
//                         (<Meeting_room />)
//                         :
//                         (<Meeting_setup setIs_setup_complete={setIs_setup_complete} />)
//                     }
//                 </StreamTheme>
//             </StreamCall>
//         </main>
//     )
// }

// export default Meeting

'use client';
import { StreamTheme, StreamCall } from '@stream-io/video-react-sdk';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Meeting_room from '@/components/meeting_room';
import Meeting_setup from '@/components/meeting_setup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { Loader2Icon } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';
import { toast_msg } from '@/lib/toast';

const Meeting = () => {
  const path = usePathname();
  const { user_information } = useChat();
  const [is_setup_complete, setIs_setup_complete] = useState(false);

  const split_path = path.split('/');
  const callId = split_path[split_path.length - 1];
  const { call, is_call_loading } = useGetCallById(callId);

  useEffect(() => {
    if (!user_information) {
      toast_msg({ title: 'User information not found' });
    }
  }, [user_information]);

  if (is_call_loading) {
    console.log('Is call loading ... ', call, is_call_loading);
  }

  if (!user_information || is_call_loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2Icon className="animate-spin size-8 text-red-500" />
      </div>
    );
  }

  return (
    <main className="bg-[#161925] text-white w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {is_setup_complete ? <Meeting_room /> : <Meeting_setup setIs_setup_complete={setIs_setup_complete} />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;