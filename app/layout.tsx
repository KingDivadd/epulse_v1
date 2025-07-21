import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"


export const metadata: Metadata = {
    title: "epulse",
    description: "Your health, our pulse.",
    
};

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={` antialiased w-screen h-screen overflow-x-hidden bg-[#ffffff]`}>
                <main>{children}</main>
                <Toaster position="top-center"/>
            </body>
        </html>
    );
}
