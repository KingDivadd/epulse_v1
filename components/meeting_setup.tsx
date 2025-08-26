'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Meeting_setup = ({setIs_setup_complete}: {setIs_setup_complete: (value: boolean)=> void}) => {
    const router = useRouter()
    const [is_mic_cam_toggled_on, setIs_mic_cam_toggled_on] = useState(false)

    const call = useCall()

    if (!call) {
        throw new Error("Usecall must be used within stream call component. ")
    }
    useEffect(() => {
        if (is_mic_cam_toggled_on){
            call?.camera.disable();
            call?.microphone.disable();

        }else{
            call?.camera.enable();
            call?.microphone.enable();
        }
        
    }, [is_mic_cam_toggled_on, call?.camera, call?.microphone])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white font-mont p-5 sm:p-0">
            <h1>Meeting Setup</h1>
            <div className="p-3 relative w-full sm:w-[400px] lg:w-[500px] flex items-center justify-center rounded-md">

                <VideoPreview className='' />
            </div>
            <div className="flex h-16 items-center justify-center gap-3">
                <label htmlFor="check" className="flex items-center justify-center gap-2 text-[14px]">
                    <input 
                        id="check"
                        type="checkbox"
                        checked={is_mic_cam_toggled_on}
                        onChange={(e)=> setIs_mic_cam_toggled_on(e.target.checked)}
                        className="" 
                    />
                    Join with mic and camera off
                </label>

                <DeviceSettings />
            </div>

            <div className="flex gap-5">
                <button className="rounded-md bg-green-500 w-[150px] text-[13px] h-[40px] sm:h-[45px]" onClick={()=>{
                    call.join();
    
                    setIs_setup_complete(true)
                }}>Join meeting</button>

                <button className="rounded-md bg-red-600 hover:opacity-90 w-[150px] h-[40px] sm:h-[45px]  text-[13px] text-white" onClick={()=>{
                    setIs_mic_cam_toggled_on(false);
                    router.back()
                }}>End Call</button>
            </div>
            
        </div>
    )
}

export default Meeting_setup