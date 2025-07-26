import React from 'react';
import Sidebar from '@/components/sidebar';
import MobileNavbar from '@/components/mobile_navbar';



export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <main className={`w-screen h-screen flex overflow-hidden relative  sm:p-0`}>
            <section className="hidden sm:block w-[80px] lg:w-[250px] "> <Sidebar /> </section>

            <section className="flex-1 h-full flex flex-col bg-[#ffffff] overflow-y-auto overflow-x-hidden">  {children} </section>

            {/* <section className="w-screen h-[70px] transparent-bg sm:hidden fixed bottom-0  left-0 z-10 flex items-center justify-between">
                <MobileNavbar />
            </section> */}
        </main>
    );
}
