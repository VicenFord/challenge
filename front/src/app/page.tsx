import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"


export default function Landing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
     <Image src="/images/Virtualisa_drive_logo.png" alt="logo" width={600} height={200} className="w-[700px] h-[170px]" />
     <Link href="/home">
      <Button className="mx-4 my-5" variant="virtualisa">Check out our mini-app!</Button>
      </Link>
    </main>
  );
}
