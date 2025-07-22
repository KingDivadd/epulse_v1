'use client'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'
import InputComponent from '@/components/auth_components/input_component'
import { patch_auth_request, post_request } from '@/app/api/index'
import { toast_msg } from '@/components/toast'
import AuthHeading from '@/components/auth_components/auth_heading'
import { useRouter } from 'next/navigation'



const ResetPassword = () => {
    const router = useRouter()
    const [auth, setAuth] = useState({password:'', confirm_password:'' })
    const [loading, setLoading] = useState(false)


    function handle_change(e:any) {
        const name = e.target.name
        const value = e.target.value

        setAuth({...auth, [name]:value})
    }

    async function handle_submit(e:any) {
        e.preventDefault()

        if (auth.password !== auth.confirm_password) {
            toast_msg({title: "Passwords do not match."})
            return
        }
    
        setLoading(true)

        try {
            const response = await patch_auth_request('auth/reset-user-password', {new_password: auth.password})
            
            if (response.status === 200 || response.status === 201) {
                localStorage.setItem('x-id-key', response.headers.get('x-id-key')) 


                toast_msg({title: "Password has been reset successfully. You can now login."})

                router.push('/login')

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
                
                <AuthHeading title={'Reset Password'} />


                <form onSubmit={handle_submit} className="w-full flex flex-col gap-5 justify-center items-start ">

                    <InputComponent title="Password" type="password" name="password" value={auth.password} onChange={handle_change} />

                    <InputComponent title="Confirm Password" type="password" name="confirm_password" value={auth.confirm_password} onChange={handle_change} />


                    
                    <Button size="sm" className="mt-5 w-full h-[55px] bg-[#306CE9] text-white hover:bg-[#306CE9]/90 transition-all duration-300 font-mont font-semibold rounded text-md"  disabled={auth.password === '' || auth.confirm_password === '' }>
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

export default ResetPassword