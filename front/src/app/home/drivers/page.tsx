import axios from "axios"
import { Drivers, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function DriversPage() {

    const { data } = await axios.get("http://localhost:3001/drivers")

    return (<div className="w-full h-full">

        <Button asChild variant="default" className="mb-10">
            <Link href="/home/drivers/create"><Plus className="mr-2"/> Create New Driver</Link>
        </Button>
        
        <DataTable columns={columns} data={data} />
    </div>)
}