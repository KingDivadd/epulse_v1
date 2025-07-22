import * as React from "react"

import { Card, CardContent,  } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {doctor_slider_list} from '@/constants'



const ServiceSlider = ()=> {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full ">
            <CarouselContent className="">
                {doctor_slider_list.map((data, ind) => (
                    <CarouselItem key={ind} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="bg-[#ffffff] box-shadow-1 border-0  px-3 py-4  gap-3 justify-between">
                                {/* <p className="text-md font-[500] text-start">{data.title}</p> */}

                                <span className="relative overflow-hidden h-[275px] sm:h-[255px] w-full bg-amber-500 rounded-[10px]">

                                </span>

                                <div className="w-full flex flex-col items-start  h-[80px] justify-between">
                                    <p className="text-md font-[500] text-start">{data.title}</p>
                                    {/* <p className="text-[13px] sm:text-md text-start text-slate-600 mt-3 font-mont">{data.description}</p> */}

                                    <button className="mt-2 py-2.5 px-14 rounded-full text-white text-[13px] bg-[#306CE9] font-mont">View all specialist</button>
                                </div>


                                
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* <CarouselPrevious className="max-sm:hidden top-[-50px] right-[-20rem]" /> */}
            {/* <CarouselNext className="hidden sm:block top-[-50px] right-0" /> */}
        </Carousel>
    )
}

export default ServiceSlider