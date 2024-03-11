"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Wrench, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Swal from "sweetalert2"
import { revalidateVehicles } from "@/app/lib/actions"
import axios from "axios"

export type Cars = {
    id: string
    plate: string
    brand: string
    model: string
    year: number
    km: number
    is_available: boolean
}

export const columns: ColumnDef<Cars>[] = [
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
      accessorKey: "year",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Year
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
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
      accessorKey: "is_available",
      header: "Is Available"
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const car = row.original        
   
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
              <DropdownMenuItem style={{ cursor: "pointer" }}
                onClick={async () => {
                    Swal.fire({
                      title: 'Are you sure you want to repair this car?',
                      text: "You won't be able to revert this.",
                      icon: 'warning',
                      confirmButtonText: 'Repair',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33'
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try{
                          const { data } = await axios.put(`http://localhost:3001/cars`, { ...car})

                          if(data?.status === "success"){
                            revalidateVehicles();
                            Swal.fire({
                              title: `Car marked as repaired!`,
                              icon: "success",
                              toast: true,
                              timer: 2500,
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
                <Wrench className="mr-2 h-4 w-4" /> Repair
              </DropdownMenuItem>

              <DropdownMenuItem style={{ color: "red", cursor: "pointer" }}
                onClick={async () => {
                    Swal.fire({
                      title: 'Are you sure you want to delete this car?',
                      text: "All the trips associated with this car will also be deleted.",
                      icon: 'warning',
                      confirmButtonText: 'Delete',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6'
                    }).then(async (result) => {
                        if(result.isConfirmed){
                          try{
                            const { data } = await axios.delete(`http://localhost:3001/cars`, { data: car })
  
                            if(data?.status === "success"){
                              revalidateVehicles();
                              Swal.fire({
                                title: `Car deleted!`,
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