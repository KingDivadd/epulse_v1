'use client'
import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useChat } from '@/app/context/ChatContext';

const DateOfBirth = () => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const { setUser_information, user_information } = useChat();

    return (
        <div className="flex flex-col gap-3 w-full font-mont">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <span
                        id="date"
                        className="w-full flex text-[13px] items-center bg-[#ffffff] border px-2 border-slate-400 rounded h-[50px] justify-between font-normal"  >
                        {date ? date.toLocaleDateString() : 'Select date'}
                        <ChevronDownIcon size={'18px'} className="text-gray-600" />
                    </span>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(selectedDate) => {
                        if (selectedDate) {
                            // Set time to 12:00 PM
                            console.log('selected date ', selectedDate)
                            selectedDate.setHours(14, 0, 0, 0);
                            setDate(selectedDate);
                            setUser_information({
                            ...user_information,
                            date_of_birth: Math.floor(selectedDate.getTime() / 1000),
                            });
                        }
                        setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );    
};

export default DateOfBirth