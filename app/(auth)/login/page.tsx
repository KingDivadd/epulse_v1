'use client'
import React, {useState, useEffect,} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import InputComponent from '@/components/auth_components/input_component'
import { post_request } from '@/app/api/index'
import {toast_msg} from '@/components/toast'
import { third_parthy_auth } from '@/constants'
import {useChat} from "@/app/context/ChatContext"
import {useRouter} from 'next/navigation'
import AuthHeading from '@/components/auth_components/auth_heading'
import { AxiosResponse, AxiosResponseHeaders } from 'axios'


const Login = () => {
    const router = useRouter()
    const {setUser_information, user_information} = useChat()
    const [auth_via_email, setAuth_via_email] = useState(true)
    const [auth, setAuth] = useState({email:'', password: '', device_type: 'web'})
    const [loading, setLoading] = useState(false)
    const [remember_me, setRemember_me] = useState(false)

    useEffect(() => {
        setAuth({...auth, device_type: remember_me ? 'mobile' : 'web' })
    }, [remember_me])

    function handle_change(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]:value})
    }

    async function handle_login(e: React.FormEvent) {
        e.preventDefault()
    
            setLoading(true)
    
            try {

                const res = await post_request('auth/patient-login', auth) as AxiosResponseHeaders

                if (res.status === 200 || res.status === 201) {

                    localStorage.setItem('x-id-key', res.headers.get('x-id-key'));

                    toast_msg({title: "Login successful!"})


                    if (res.data.user_data.physican_id) {
                        router.push('/dashboard')

                        console.log('redirecting to dashboard...')

                    }
                    else{
                        const {gender, country_code, phone_number, date_of_birth} = res.data.user_data

                        if (!gender || !country_code || !phone_number || !date_of_birth) {

                            setUser_information({...user_information, ...res.data.user_data, email:auth.email})

                            router.push(`/user-details/${res.data.user_data.patient_id}`)
                            
                        }else{
                            router.push('/dashboard')
                        }
                    }
                    setAuth({...auth, email:'', password: '', })

                    setLoading(false)

                } 
                
                else if (res.status === 500 ){

                    toast_msg({title: "Network error. Please try again later.", type:'danger'})
                    
                } else if (res.status === 403){
                    setUser_information({...user_information, email:auth.email})

                    router.push('/verification')
                }
                else {
                    setLoading(false)
    
                    const error_msg = `${res.response.data.msg || "An error occurred during login."}`
    
                    toast_msg({title: error_msg, type:'danger'})
                }
            } catch (error ) {
                console.log('error during signup ',)
                setLoading(false)
            } finally {
                setLoading(false)
            }
    }


    return (
        <section className="w-full h-full px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col items-center justify-center gap-8 relative ">
            {/* {auth_via_email && <span className="w-full flex justify-start">
                        <Button className=' flex items-center  text-md font-mont font-semibold'  variant={'ghost'} onClick={()=> setAuth_via_email(!auth_via_email)}>
                            <span className="h-5 w-5 overflow-hidden relative">
                                <Image src="/icons/left-icon.png" alt="Back Icon" fill className="object-contain" />
                            </span>
                            Back
                        </Button>
                    </span>} */}

            <AuthHeading title={'Log in'} />

            {!auth_via_email ? <div className="w-full flex flex-col gap-5 items-center justify-center mb-2">
                {
                        third_parthy_auth.map((data) => {
                            const {name, icon, id} = data
                            return (
                                <button key={id} className="h-[55px] w-full flex items-center justify-center gap-2 text-sm sm:text-md font-mont border border-slate-400 rounded font-[500] hover:bg-slate-100 transition-all duration-300" 
                                    onClick={()=> {
                                        if (id === 'email') {
                                            setAuth_via_email(!auth_via_email)
                                        }
                                    }}
                                >
                                    <span className="overflow-hidden relative h-5 w-5">
                                        <Image src={icon} alt={`${name} Logo`} fill className="object-contain" />
                                    </span>
                                    Continue with {name}
                                </button>
                            )
                        })
                    }

            </div>
            :

            <form onSubmit={handle_login} className="w-full flex flex-col gap-5 justify-center items-start ">

                <InputComponent title="Email" type="email" name="email" value={auth.email} onChange={handle_change} />

                <InputComponent title="Password" type="password" name="password" value={auth.password} onChange={handle_change} />

                <span className="w-full flex items-center justify-start gap-[10px] ">
                    <input type="checkbox" name="remember_me" className='h-4 w-4' id="remember_me" onChange={(e) => setRemember_me(e.target.checked)}/>
                    <label htmlFor="remember_me" className="text-sm  font-[500] font-mont text-slate-700 cursor-pointer " >Remember me</label>
                </span>
                <button className="mt-5 w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded text-md" onSubmit={handle_login} disabled={auth.email === '' || auth.password === ''} type="submit"  >
                    {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Login'}
                </button>
            </form>}


            {auth_via_email && <Link href={'/forget-password'} className="text-md  text-center w-[300px] font-mont hover:cursor-pointer font-medium text-[#306ce9] mt-2 " >I forgot my password.</Link>}

            <h3 className="text-sm flex items-center justify-center gap-1  mt-[-10px] font-mont">
                {"Don't have an account?"} <Link href={'/signup-type'} className='text-[#306CE9] hover:underline duration-300 font-semibold'>Sign up</Link>
            </h3>

        </section>
    )
}

export default Login