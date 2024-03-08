import axios from "axios"
import { Cars, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Plus } from 'lucide-react';

export default async function DriversPage() {

    const { data } = await axios.get("http://localhost:3001/cars")

    return (<div className="w-full h-full">

        <Button asChild variant="default" className="mb-10 mr-5">
            <Link href="/home/vehicles/usage"><BarChart3 className="mr-2"/> Usage of the vehicles</Link>
        </Button>

        <Button asChild variant="default" className="mb-10">
            <Link href="/home/vehicles/create"><Plus className="mr-2"/> Create New Vehicle</Link>
        </Button>
        
        <DataTable columns={columns} data={data} />
    </div>)
}