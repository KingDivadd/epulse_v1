import React from 'react';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <main className={`w-screen h-screen flex`}>
            <Sidebar />
            <section className="flex-1 h-[100vh] flex flex-col bg-[#161925] overflow-y-auto overflow-x-hidden">
                <div className="w-full">
                    <Navbar />
                    {children}
                </div>
            </section>
        </main>
    );
}
