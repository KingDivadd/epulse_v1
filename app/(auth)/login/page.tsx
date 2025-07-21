'use client'
import React, {useState, useEffect, use} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import InputComponent from '@/components/auth_components/input_component'
import { post_request } from '@/app/api/index'
import {toast_msg} from '@/components/toast'
import { toast } from "sonner"


const Login = () => {
    const [auth_via_email, setAuth_via_email] = useState(false)
    const [auth, setAuth] = useState({email:'', password: '', device_type: 'web'})
    const [loading, setLoading] = useState(false)
    const [remember_me, setRemember_me] = useState(false)

    useEffect(() => {
        setAuth({...auth, device_type: remember_me ? 'mobile' : 'web' })
    }, [remember_me])

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]:value})
    }

    async function handle_login(e:any) {
        e.preventDefault()
    
            setLoading(true)
    
            try {

                const res = await post_request('auth/patient-login', auth)

                if (res.status === 200 || res.status === 201) {
                    localStorage.setItem('x-id-key', res.data.headers.get('x-id-key')) 

                    toast_msg({title: "Login successful!"})

                    setLoading(false)

                    // window.location.href = '/dashboard'
                } else if (res.status === 500 ){

                    toast_msg({title: "Network error. Please try again later."})
                    
                }else {
                    setLoading(false)
    
                    const error_msg = `${res.response.data.msg || "An error occurred during login."}`
    
                    toast_msg({title: error_msg})
                }
                
            } catch (error) {
                console.log("Error during login:", error);
                setLoading(false)
            } finally {
                setLoading(false)
            }
    }


    return (
        <section className="w-full h-full px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col items-center justify-center gap-8 relative ">
            <Button className=' absolute top-[1.5rem] left-[1rem] md:left-[2rem] lg:left-[4rem] flex items-center gap-3 text-md font-mont text-[#101010] hover:text-[#306ce9]'  variant={'ghost'} onClick={()=> setAuth_via_email(!auth_via_email)}>
                <span className="h-5 w-5 overflow-hidden relative">
                    <Image src="/back.svg" alt="Back Icon" fill className="object-contain" />
                </span>
                {'Back'}
            </Button>

            <h5 className="font-bold font-mont text-4xl text-[#306CE9]">EPULSE.</h5>

            <p className="text-xl sm:text-2xl text-slate-700 font-[500] font-mont">Log in</p>

            {!auth_via_email ? <div className="w-full flex flex-col gap-5 items-center justify-center mb-2">
                <button className="h-[55px] w-full flex items-center justify-center gap-2 text-sm sm:text-md text-slate-600 font-mont border border-slate-400 rounded-md font-[500] hover:bg-slate-100 transition-all duration-300">
                    <span className="overflow-hidden relative h-5 w-5">
                        {/* <Image src="/" alt="Google Logo" fill className="object-contain" /> */}
                    </span>
                    Continue with Google
                </button>

                <button className="h-[55px] w-full flex items-center justify-center gap-2 text-sm sm:text-md text-slate-600 font-mont border border-slate-400 rounded-md font-[500] hover:bg-slate-100 transition-all duration-300">
                    <span className="overflow-hidden relative h-5 w-5">
                        {/* <Image src="/" alt="Google Logo" fill className="object-contain" /> */}
                    </span>
                    Continue with Apple
                </button>

                <button className="h-[55px] w-full flex items-center justify-center gap-2 text-sm sm:text-md text-slate-600 font-mont border border-slate-400 rounded-md font-[500] hover:bg-slate-100 transition-all duration-300" onClick={()=> setAuth_via_email(!auth_via_email)}>
                    <span className="overflow-hidden relative h-5 w-5">
                        {/* <Image src="/" alt="Google Logo" fill className="object-contain" /> */}
                    </span>
                    Continue with Email
                </button>

            </div>
            :

            <form onSubmit={handle_login} className="w-full flex flex-col gap-5 justify-center items-start ">

                <InputComponent title="Email" type="email" name="email" value={auth.email} onChange={handle_change} />

                <InputComponent title="Password" type="password" name="password" value={auth.password} onChange={handle_change} />

                <span className="w-full flex items-center justify-start gap-[10px] ">
                    <input type="checkbox" name="remember_me" className='h-4 w-4' id="remember_me" onChange={(e) => setRemember_me(e.target.checked)}/>
                    <label htmlFor="remember_me" className="text-sm  font-[500] font-mont text-slate-700 cursor-pointer " >Remember me</label>
                </span>
                <Button size="sm" className="mt-5 w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded-md text-md" onSubmit={handle_login} disabled={auth.email === '' || auth.password === ''} type="submit"  >
                    {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Login'}
                </Button>
            </form>}


            {auth_via_email && <Link href={'/forget-password'} className="text-md  text-center w-[300px] font-mont hover:cursor-pointer font-medium text-[#306ce9] mt-2 " >I forgot my password.</Link>}

            <h3 className="text-md flex items-center justify-center gap-1  mt-[-10px] font-mont">
                Don't have an account? <Link href={'/signup'} className='text-[#306CE9] hover:underline duration-300 font-semibold'>Sign up</Link>
            </h3>

        </section>
    )
}

export default Login