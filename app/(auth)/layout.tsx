import Sidepage from "@/components/auth_components/sidepage";
// import { Toaster } from "@/components/ui/sonner


export default function AuthLayout({ children }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <main className={` antialiased w-screen h-screen overflow-x-hidden grid grid-cols-4 xl:grid-cols-5 `}>
            <div className="max-md:hidden col-span-2 xl:col-span-3 h-full bg-[#306CE9] overflow-y-auto">
                <Sidepage />
            </div>

            <div className="col-span-4 md:col-span-2 bg-white ">{children}</div>
        </main>
    );
    }

