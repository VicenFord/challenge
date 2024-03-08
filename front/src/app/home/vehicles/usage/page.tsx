import { Button } from "@/components/ui/button";
import axios from "axios";
import { columns } from "./columns";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { DataTable } from "./data-table";

export default async function UsageVehiclesPage() {

    const { data } = await axios.get("http://localhost:3001/trips/ratio")

    return (<div className="w-full h-full">

        <Button asChild variant="default" className="mb-10">
            <Link href="/home/vehicles"> <MoveLeft className="mr-3"/> Back to Vehicles</Link>
        </Button>
        
        <DataTable columns={columns} data={data} />
    </div>)
}