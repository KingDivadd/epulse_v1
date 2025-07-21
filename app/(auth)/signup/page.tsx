'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import InputComponent from '@/components/auth_components/input_component'
import { post_request } from '@/app/api/index'
import { toast_msg } from '@/components/toast'



const Signup = () => {
    const [auth_via_email, setAuth_via_email] = useState(false)
    const [auth, setAuth] = useState({email:'', password: '', first_name: '', last_name: ''})
    const [loading, setLoading] = useState(false)
    const [signup_stage, setSignup_stage] = useState('signup')

    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]:value})
    }

    async function handle_submit(e:any) {
        e.preventDefault()
    
        setLoading(true)

        try {
            const response = await post_request('auth/patient-signup', auth)
            console.log(response)
            
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('x-id-key', response.data.headers.get('x-id-key')) 

                console.log("Signup successful:", response.data);

                toast_msg({title: "Account created successfully! Please login to continue."})

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
            console.error("Error during signup:", error);
        } finally {
            setLoading(false)
        }


    }
    return (
        <section className="w-full h-full px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col items-center justify-center gap-8 overflow-y-auto relative">
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 my-10">
                
                <h5 className="font-bold font-mont text-4xl text-[#306CE9]">EPULSE.</h5>

                <p className="text-xl sm:text-2xl text-slate-700 font-[500] font-mont">Create an account</p>

                {!auth_via_email ? <div className="w-full flex flex-col gap-5 items-center justify-center mb-2">
                    <button className="h-[55px] w-full flex items-center justify-center gap-2 text-sm sm:text-md font-mont border border-slate-400 rounded-md font-[500] hover:bg-slate-100 transition-all duration-300">
                        <span className="overflow-hidden relative h-5 w-5">
                            {/* <Image src="/" alt="Google Logo" fill className="object-contain" /> */}
                        </span>
                        Continue with Google
                    </button>

                    <button className="h-[55px] w-full flex items-center justify-center gap-2 text-sm sm:text-md font-mont border border-slate-400 rounded-md font-[500] hover:bg-slate-100 transition-all duration-300">
                        <span className="overflow-hidden relative h-5 w-5">
                            {/* <Image src="/" alt="Google Logo" fill className="object-contain" /> */}
                        </span>
                        Continue with Apple
                    </button>

                    <button className="h-[55px] w-full flex items-center justify-center gap-2 text-sm sm:text-md font-mont border border-slate-400 rounded-md font-[500] hover:bg-slate-100 transition-all duration-300" onClick={()=> setAuth_via_email(!auth_via_email)}>
                        <span className="overflow-hidden relative h-5 w-5">
                            {/* <Image src="/" alt="Google Logo" fill className="object-contain" /> */}
                        </span>
                        Continue with Email
                    </button>

                </div>
                :

                <form onSubmit={handle_submit} className="w-full flex flex-col gap-5 justify-center items-start ">
                    <InputComponent title="First Name" type="text" name="first_name" value={auth.first_name} onChange={handle_change} />

                    <InputComponent title="Last Name" type="text" name="last_name" value={auth.last_name} onChange={handle_change} />

                    <InputComponent title="Email" type="email" name="email" value={auth.email} onChange={handle_change} />

                    <InputComponent title="Password" type="password" name="password" value={auth.password} onChange={handle_change} />

                    {/* <button className="w-full h- rounded-md bg-[#] text-white"></button> */}

                    <Button size="sm" className="mt-5 w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded-md text-md"  disabled={auth.email === '' || auth.password === ''}>
                        {loading ? <Loader2Icon className="animate-spin size-8 " /> : 'Signup'}
                    </Button>
                </form>}


                {auth_via_email && <p className="text-md  text-center w-[300px] font-mont hover:cursor-pointer font-medium hover:text-[#306ce9] mt-2 " onClick={()=> setAuth_via_email(!auth_via_email)}>Signup using other method.</p>}

                <p className="text-md  text-slate-600 text-center w-[300px] font-outfit mt-[-10px]">By continuing, you agree to EPulse Terms of Use and Privacy Policy.</p>

                <h3 className="text-md flex items-center justify-center gap-1 font-semibold font-mont mt-[-10px]">
                    Already have an account? <Link href={'/login'} className='text-[#306CE9] hover:underline duration-300 '>Login</Link>
                </h3>
            </div>

        </section>
    )
}

export default Signup