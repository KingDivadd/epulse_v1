'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import InputComponent from '@/components/auth_components/input_component'
import { post_request } from '@/app/api/index'
import { toast_msg } from '@/components/toast'
import { useRouter } from 'next/navigation'
import AuthHeading from '@/components/auth_components/auth_heading'
import { useChat } from '@/app/context/ChatContext'


const ForgetPassword = () => {
    const {setUser_information, user_information} = useChat()
    const router = useRouter()
    const [auth, setAuth] = useState({email:'' })
    const [loading, setLoading] = useState(false)


    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]:value})
    }

    async function handle_submit(e:any) {
        e.preventDefault()
    
        setLoading(true)

        try {
            const response = await post_request('auth/generate-user-otp', {email:auth.email})
            
            if (response.status === 200 || response.status === 201) {

                setUser_information({...user_information, email: auth.email })

                setAuth({email:''}) 

                toast_msg({title: "OTP has been sent to your email. Please check your inbox."})

                router.push('/reset-verification')

                setLoading(false)
            } else if (response.status === 500 ){
                toast_msg({title: "Network error. Please try again later."})
            }
            else {
                setLoading(false)

                const error_msg = `${response.response.data.msg || "An error occurred during signup."}`

                toast_msg({title: error_msg})
            }

        } catch (error) {
            console.log("Error during signup:", error);
        } finally {
            setLoading(false)
        }


    }
    return (
        <section className="w-full h-full px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col items-center justify-center gap-8 relative overflow-y-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 my-10">

                <AuthHeading title={'Input Details'} />

                <form onSubmit={handle_submit} className="w-full flex flex-col gap-5 justify-center items-start ">

                    <InputComponent title="Email" type="email" name="email" value={auth.email} onChange={handle_change} />


                    
                    <Button size="sm" className="mt-5 w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded text-md"  disabled={auth.email === ''}>
                        {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Next'}
                    </Button>
                </form>


                <h3 className="text-sm flex items-center justify-center gap-1  mt-[-10px] font-mont">
                    Remembered Password? <Link href={'/login'} className='text-[#306CE9] hover:underline duration-300 font-semibold'>Login</Link>
                </h3>
            </div>

        </section>
    )
}

export default ForgetPassword