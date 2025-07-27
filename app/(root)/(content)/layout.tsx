'use client'
import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import MobileNavbar from '@/components/mobile_navbar';
import { useChat } from '@/app/context/ChatContext';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { show_mobile_sidebar, setShow_mobile_sidebar } = useChat();

    // Handler to close mobile sidebar when clicking outside
    const handleOutsideClick = (e: React.MouseEvent) => {
        if (show_mobile_sidebar) {
        setShow_mobile_sidebar(false);
        }
    };

    // Handler to prevent clicks inside mobile sidebar from closing it
    const handleMobileSidebarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <main className="w-screen h-screen flex overflow-hidden relative sm:p-0" onClick={handleOutsideClick}>
            <section className="hidden sm:block w-[80px] lg:w-[250px]">
                <Sidebar />
            </section>

            <section className="flex-1 h-full flex flex-col bg-[#ffffff] overflow-y-auto overflow-x-hidden">
                {children}
            </section>

            <section
                className={`absolute w-[275px] h-screen bg-white border-r border-[#f2f2f2] sm:hidden top-0 ${
                show_mobile_sidebar ? 'left-0' : 'left-[-280px]'
                } duration-300 z-10 flex items-start justify-between`}
                onClick={handleMobileSidebarClick}>
                <MobileNavbar />
            </section>
        </main>
    );
}