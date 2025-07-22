"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useChat } from "@/app/context/ChatContext"

const DateOfBirth = ()=> {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const { setUser_information, user_information } = useChat()

    return (
        <div className="flex flex-col gap-3 w-full ">
            
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                <span
                    id="date"
                    className="w-full flex items-center bg-[#ffffff] border px-2 border-slate-400 rounded h-[50px] justify-between font-normal"
                >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                </span>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                        if (date){

                            setUser_information({...user_information, date_of_birth: Math.floor(date.getTime() / 1000).toString()})

                        }
                    }}
                />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateOfBirth