import React from 'react'
import {InputComponent2} from './input_component'
import countries from '@/constants/countries.json'
import {useChat} from '@/app/context/ChatContext'

const PhoneInputComponent = ({country_code, phone_number, on_change}:PhoneInputProps) => {

    const { setCountry_dial_code} = useChat()
    
    return (
        <div className="flex items-center gap-2 w-full">
            <select
                name="country_code"
                onChange={(e) => 
                    {
                        console.log(e.target.value); 
                        setCountry_dial_code(e.target.value)
                    }
                } 
                className="border border-slate-400 rounded px-3 h-[50px] w-1/3"
            >
                <option value="+234">+234 Nigeria</option>
                {
                    countries.map((country,ind)=>{

                        return(
                            <option key={ind} value={country.dial_code} className='flex gap-5'>
                                    
                                {country.dial_code}  {country.name}
                            </option>
                        )
                    })
                }

            </select>
            <InputComponent2 onChange={on_change} name='phone_number' value={phone_number} title='Phone number' type='number' />
            
        </div>
    )
}

export default PhoneInputComponent