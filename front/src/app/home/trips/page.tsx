"use server"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Trips, columns } from "./columns"
import { DataTable } from "./data-table"
import axios from "axios";


export default async function TripsPage() {

    const result = await axios.get("http://localhost:3001/trips")

    return (
    <div className="w-full h-full">

        <Button asChild variant="default" className="mb-10">
            <Link href="/home/trips/create"><Plus className="mr-2"/> Create New Trip</Link>
        </Button>

        <DataTable columns={columns} data={result.data} />
        
    </div>)
}