'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import InputComponent from '@/components/auth_components/input_component'
import { get_auth_request, patch_request, post_request } from '@/app/api/index'
import { toast_msg } from '@/components/toast'
import { InputOTP,  InputOTPGroup,  InputOTPSeparator,  InputOTPSlot,} from "@/components/ui/input-otp"
import { useChat } from '@/app/context/ChatContext'
import { useRouter } from 'next/navigation'
import AuthHeading from '@/components/auth_components/auth_heading'



const UserDetails = () => {
    const router = useRouter()
    const {setUser_information, user_information} = useChat()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState('')

    useEffect(() => {
        if (!user_information?.email || localStorage.getItem('x-id-key') === null) {
            // then we have to get informations from x-id-key
            handle_get_user_info()
        }
    }, [])

    async function handle_get_user_info() {
        try {

            const res = await get_auth_request('auth/user-information')

            if (res.status === 200 || res.status === 201) {
                console.log(res.data.user.email)

                setUser_information({...user_information, email: res.data.user.email, patient_id: res.data.user.patient_id || null, physician_id: res.data.user.physician_id || null, role: res.data.user.role})

            }else{
                router.push('/login')
            }

        } catch (err) {
            console.log(err);
            
        }
    }

    function handle_change(value:string) {
        setOtp(value)
        
        // if (value.length === 6) {
        //     handle_submit(new Event('submit')) 
        // }
    }

    async function handle_new_otp() {
        setLoading(true)

        try {
            const response = await post_request(`auth/generate-user-otp`, {email: user_information?.email,})

            if (response.status === 200 || response.status === 201) {
                toast_msg({title: "OTP sent successfully!"})
            } else if (response.status === 500 ){
                toast_msg({title: "Network error. Please try again later.", type:'danger'})
            } else {
                const error_msg = `${response.response.data.msg || "An error occurred while requesting OTP."}`
                toast_msg({title: error_msg, type:'danger'})
            }
        } catch (error) {
            console.log("Error requesting OTP:", error);
        } finally {
            setLoading(false)
        }
    }


    async function handle_submit(e:any) {
        e.preventDefault()
    
        setLoading(true)

        try {
            const response = await patch_request(`auth/verify-user-otp`, {email:user_information?.email ,otp: otp})
            
            if (response.status === 200 || response.status === 201) {

                localStorage.setItem('x-id-key', response.headers.get('x-id-key')) 

                toast_msg({title: "Verification successful."})

                router.push('/reset-password')

                setLoading(false)
            } else if (response.status === 500 ){
                toast_msg({title: "Network error. Please try again later.", type:'danger'})
            }
            else {
                setLoading(false)

                const error_msg = `${response.response.data.msg || "An error occurred during signup."}`

                toast_msg({title: error_msg, type:'danger'})
            }

        } catch (error) {
            console.log("Error during signup:", error);
        } finally {
            setLoading(false)
        }


    }
    return (
        <section className="w-full h-full px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col items-center justify-center gap-8 overflow-y-auto relative">
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 my-10">
                
                <AuthHeading title={'Account Verification'} />

                <p className="text-[15px] text-center text-slate-700  font-mont">A code was sent to your email earlier. Enter the code to verify your account</p>


                <form onSubmit={handle_submit} className="w-full flex flex-col gap-10 mt-5 justify-center items-center ">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={handle_change}
                        className="w-full flex flex-wrap"
                    >
                        <InputOTPGroup className="flex items-center justify-center gap-2 ">
                            <InputOTPSlot index={0} className="otp-input sm:h-15 sm:w-15" />
                            <InputOTPSlot index={1} className="otp-input sm:h-15 sm:w-15"/>
                            <InputOTPSlot index={2} className="otp-input sm:h-15 sm:w-15"/>
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-slate-400" />
                        <InputOTPGroup className="flex items-center justify-center gap-2 ">
                            <InputOTPSlot index={3} className="otp-input sm:h-15 sm:w-15" />
                            <InputOTPSlot index={4} className="otp-input sm:h-15 sm:w-15"/>
                            <InputOTPSlot index={5} className="otp-input sm:h-15 sm:w-15"/>
                        </InputOTPGroup>
                    </InputOTP>


                    {/* <button className="w-full h- rounded bg-[#] text-white"></button> */}

                    <h3 className="text-sm flex items-center justify-center gap-1  mt-[-10px] font-mont">
                        {'Didn\'t receive any code?'} <p className='text-[#306CE9] hover:underline duration-300 font-semibold' onClick={handle_new_otp}>Request Again</p>
                    </h3>

                    <Button type='submit' size="sm" className=" w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded text-md"  disabled={otp.length < 6} onClick={handle_submit}>
                        {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Next'}
                    </Button>
                </form>

            </div>

        </section>
    )
}

export default UserDetails