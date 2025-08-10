'use client'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import { patch_auth_request, } from '@/app/api/index'
import { toast_msg } from '@/lib/toast'
import {useChat} from '@/app/context/ChatContext'
import PhoneInputComponent from '@/components/auth_components/phone_input_component'
import DateOfBirth from '@/components/auth_components/date_of_birth'
import AuthHeading from '@/components/auth_components/auth_heading'
import { useRouter } from 'next/navigation'
import { AxiosResponseHeaders } from 'axios'


const UserDetails = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({gender:'', country_code:'', phone_number:'' , date_of_birth:0})
    const [loading, setLoading] = useState(false)
    
    const { user_information, country_dial_code} = useChat()  

    useEffect(() => {
        setAuth({...auth, country_code: country_dial_code})
    }, [ country_dial_code])

    useEffect(() => {
        setAuth({...auth, date_of_birth: Number(user_information?.date_of_birth) || Math.floor(Date.now() / 1000)}) 
    }, [user_information?.date_of_birth])

    function handle_change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]:value})
    }

    async function handle_submit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
        e.preventDefault()
    
        setLoading(true)

        try {
            const response = await patch_auth_request('auth/signup-update-patient-data', auth) as AxiosResponseHeaders
            
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('x-id-key', response.headers.get('x-id-key'))


                toast_msg({title: "Details updated successfully."})

                setTimeout(() => {
                    router.push('/profile') 
                }, 4000);

                setLoading(false)
            } else if (response.status === 401){
                toast_msg({title: 'Session expired, log in again.'})
                
                setTimeout(() => {
                    router.push('/login')
                }, 3000);
            }
            else if (response.status === 500 ){
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
        <section className="w-full h-full px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col items-center justify-center gap-8 relative overflow-y-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 my-10">
                
                <AuthHeading title={'Input Details'} />


                <form onSubmit={handle_submit} className="w-full flex flex-col gap-5 justify-center items-start ">


                    <span className="flex flex-col gap-2 w-full">
                        <p className="text-[13px] font-medium font-mont">Gender</p>
                        <select
                            name="gender"
                            id="gender"
                            className="w-full h-[50px] border border-slate-400 px-2 bg-white text-[13px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#306ce9] font-mont"
                            value={auth.gender}
                            onChange={handle_change}
                        >
                            <option className='font-mont text-[12px]' value="">Select Gender</option>
                            <option className='font-mont text-[12px]' value="male">Male</option>
                            <option className='font-mont text-[12px]' value="female">Female</option>
                            <option className='font-mont text-[12px]' value="other">Other</option>
                        </select>
                    </span>

                    
                    <span className="flex flex-col items-start justify-start gap-2 w-full">
                        <p className="text-[13px] font-medium font-mont">Date of Birth</p>

                        <DateOfBirth />
                    </span>


                    <span className="flex flex-col items-start justify-start gap-2 w-full">
                        <p className="text-[13px] font-medium font-mont">Phone number</p>

                        <PhoneInputComponent country_code={auth.country_code} phone_number={auth.phone_number} on_change={handle_change}  />
                    </span>
                    
                    <Button type='submit' size="sm" className="mt-5 w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded text-[15.5px]" onClick={handle_submit}  disabled={auth.phone_number === '' || auth.gender === '' || auth.country_code === ''  }>
                        {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Next'}
                    </Button>
                </form>


                <h3 className="text-[13px] flex items-center justify-center gap-1  mt-[-10px] font-mont">
                    Already have an account? <Link href={'/login'} className='text-[#306CE9] hover:underline duration-300 font-semibold'>Login</Link>
                </h3>
            </div>

        </section>
    )
}

export default UserDetails