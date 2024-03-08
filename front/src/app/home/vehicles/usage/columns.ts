"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Ratio = {
    plate : string
    brand : string
    model : string
    drivers: object
    total_km_combined: number
}

export const columns: ColumnDef<Ratio>[] = [
    {
      accessorKey: "plate",
      header: "Plate"
    },
    {
      accessorKey: "brand",
      header: "Brand"
    },
    {
      accessorKey: "model",
      header: "Model"
    },
    {
      accessorKey: "total_km_combined",
      header: "Total driven KMs"
    },
    {
     accessorKey: "drivers",
     header: "Drivers who used this vehicle",
    }
  ]