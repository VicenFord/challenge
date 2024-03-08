import Image from "next/image";

export default async function Home() {
    return <div className="w-full h-full">
        <Image src="/images/background_image.png" alt="background image" width={1080} height={1080}
        className="w-full h-full"
        style={{objectFit: "cover"}} priority/>
    </div>
}