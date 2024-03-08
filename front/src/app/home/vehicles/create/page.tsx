import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MoveLeft } from "lucide-react"
import CreateVehicleForm from "./CreateVehicleForm"
import axios from "axios"

export default async function CreateVehiclePage() {

    const {data} = await axios.get("http://localhost:3001/car_brands")

    return (
    <div className="w-full h-full">
        
        <Button asChild variant="default" className="mb-10">
            <Link href="/home/vehicles"> <MoveLeft className="mr-3"/> Back to Vehicles</Link>
        </Button>

        <CreateVehicleForm carBrands={data}/>
    </div>)
}