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
import {useChat} from '@/app/context/ChatContext'
import {third_parthy_auth} from '@/constants'
import AuthHeading from '@/components/auth_components/auth_heading'
import { signIn } from 'next-auth/react';


const Signup = () => {
    const {user_information, setUser_information} = useChat()
    const [auth_via_email, setAuth_via_email] = useState(true)
    const [auth, setAuth] = useState({email:'', password: '', first_name: '', last_name: ''})
    const [loading, setLoading] = useState(false)
    const router = useRouter()
        

    useEffect(() => {
        
        if (!user_information?.role) {
            router.push('/signup-type')
        }
    }, [])

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]:value})
    }

    async function handle_submit(e:any) {
        e.preventDefault()
    
        setLoading(true)

        try {
            const patient_signup_url = 'auth/patient-signup'
            const physician_signup_url = 'auth/physician-signup'
            const response = await post_request(`${user_information?.role == 'patient' ? patient_signup_url : physician_signup_url }`, auth)
            
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('x-id-key', response.headers.get('x-id-key')) 

                toast_msg({title: "Account created successfully! "})

                setUser_information({...user_information, ...auth, email: auth.email})

                router.push(`/verification`)

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
        <>
        
        {user_information?.role && <section className="w-full h-[100vh]  flex flex-col items-center justify-center gap-8 overflow-hidden relative">
            <div className="w-full  overflow-y-auto px-[1rem] md:px-[2rem] lg:px-[4rem]">
                

                <div className="w-full   flex flex-col items-center justify-center gap-8 my-10">
                    {/* {auth_via_email && 
                    <span className="w-full flex justify-start ">
                        <Button className=' flex items-center  text-md font-mont font-semibold'  variant={'ghost'} onClick={()=> setAuth_via_email(!auth_via_email)}>
                            <span className="h-5 w-5 overflow-hidden relative">
                                <Image src="/icons/left-icon.png" alt="Back Icon" fill className="object-contain" />
                            </span>
                            Back
                        </Button>
                    </span>} */}

                    <AuthHeading title={`Sign up as a ${ user_information.role == 'patient' ? "Patient":"Physician"}`} />
                    
                    {!auth_via_email ? <div className="w-full flex flex-col gap-5 items-center justify-center mb-2">

                        {
                            third_parthy_auth.map((data) => {
                                const {name, icon, id} = data
                                return (
                                    <button key={id} className="h-[55px] w-full flex items-center justify-center gap-2 text-sm sm:text-md font-mont border border-slate-400 rounded font-[500] hover:bg-slate-100 transition-all duration-300" onClick={()=> {
                                        if (id === 'email') {
                                            setAuth_via_email(true)
                                        }
                                    }} >
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

                    <form onSubmit={handle_submit} className="w-full flex flex-col gap-5 justify-center items-start ">
                        <InputComponent title="First Name" type="text" name="first_name" value={auth.first_name} onChange={handle_change} />

                        <InputComponent title="Last Name" type="text" name="last_name" value={auth.last_name} onChange={handle_change} />

                        <InputComponent title="Email" type="email" name="email" value={auth.email} onChange={handle_change} />

                        <InputComponent title="Password" type="password" name="password" value={auth.password} onChange={handle_change} />

                        {/* <button className="w-full h- rounded bg-[#] text-white"></button> */}

                        <Button size="sm" className="mt-5 w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded text-md"  disabled={auth.email === '' || auth.password === ''}>
                            {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Signup'}
                        </Button>
                    </form>}

                    <p className="text-[15px] text-center w-full sm:w-[350px] font-mont mt-[-10px]">By continuing, you agree to EPulse Terms of Use and Privacy Policy.</p>

                    <h3 className="text-sm flex items-center justify-center gap-1  mt-[-10px] font-mont">
                        Already have an account? <Link href={'/login'} className='text-[#306CE9] hover:underline duration-300 font-semibold'>Login</Link>
                    </h3>
                </div>
            </div>

        </section>}
        </>
    )
}

export default Signup