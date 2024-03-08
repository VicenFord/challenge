"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";
import { Car, UsersRound, AudioWaveform, Cog } from 'lucide-react';
import { usePathname } from "next/navigation";

export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {    
    
    const pathname = usePathname();
    

    return (
        <div className="flex flex-row p-10 h-screen w-screen">
            <nav className="flex flex-col gap-4 w-1/4 h-full justify-start items-center ">
                <Link href="/home" className="w-3/4 h-[80px] mb-10">
                    <Image src="/images/Virtualisa_drive_logo.png" alt="logo" width={200} height={90} className="w-full h-[80px] mb-10" />
                
                </Link>
                
                <Button asChild variant={pathname.includes("/home/vehicles") ? "default" : "virtualisa"} className="w-3/4">
                    <Link href="/home/vehicles">
                        Vehicles <Car className="ms-2"/>
                    </Link>
                </Button>
                <Button asChild variant={pathname.includes("/home/drivers") ? "default" : "virtualisa"} className="w-3/4">
                    <Link href="/home/drivers">
                        Drivers <UsersRound className="ms-2"/>
                    </Link>
                </Button>
                <Button asChild variant={pathname.includes("/home/trips") ? "default" : "virtualisa"} className="w-3/4">
                    <Link href="/home/trips">
                        Trips <AudioWaveform className="ms-2"/>
                    </Link>
                </Button>
                
            </nav>
            
            <div className="w-3/4" style={{borderRadius: "10px", overflow: "scroll"}}>
                {children}
            </div>
        </div>
    );
  }