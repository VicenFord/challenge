"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Swal from 'sweetalert2';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { onlyRevalidateTrips } from "../../lib/actions"

export type Trips = {
    id: string
    date: string
    hour: number
    minutes: string
    km: string
    name: string
    surname: string
    plate: string
    brand: string
    model: string
}

export const columns: ColumnDef<Trips>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      },
      {
        accessorKey: "hour",
        header: "Hour"
      },
      {
        accessorKey: "minutes",
        header: "Minutes"
      },
    {
        accessorKey: "km",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              KMs
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      },
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "surname",
      header: "Surname"
    },
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
      id: "actions",
      cell: ({ row }) => {
        const trip = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem style={{ color: "red", cursor: "pointer" }}
                onClick={async () => {
                    Swal.fire({
                      title: 'Are you sure you want to delete this trip?',
                      text: "You won't be able to revert this.",
                      icon: 'warning',
                      confirmButtonText: 'Delete',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6'
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try{
                          const { data } = await axios.delete(`http://localhost:3001/trips`, { data: trip })
                          if(data?.status === "success"){
                            onlyRevalidateTrips();
                            Swal.fire({
                              title: `Trip deleted!`,
                              icon: "success",
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                            });
                          }
                        }catch(err){
                          console.log(err)
                        }
                      }
                    })
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]