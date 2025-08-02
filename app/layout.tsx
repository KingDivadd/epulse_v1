import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import {ChatProvider} from '@/app/context/ChatContext'


export const metadata: Metadata = {
    title: "epulse",
    description: "Your health, our pulse.",
    icons: {
        icon: "/icons/heart-rate-3.png",
    }
    
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en" className="scroll-smooth">

            <body className={` antialiased w-screen h-screen overflow-x-hidden bg-gray-100`}>
                <ChatProvider>
                    <main>{children}</main>
                    <Toaster position="top-center"/>
                </ChatProvider>
            </body>
        </html>
    );
}
