"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Swal from "sweetalert2"
import axios from "axios"
import { revalidateDrivers } from "../../lib/actions"

export type Drivers = {
    id: string
    name: string
    surname: string
    dni: string
    driven_km: number
    emission_date: string | undefined
    type?: string
    is_available_to_drive?: boolean
    wage?: string
}

export const columns: ColumnDef<Drivers>[] = [
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "surname",
      header: "Surname"
    },
    {
      accessorKey: "dni",
      header: "DNI"
    },
    {
      accessorKey: "license",
      header: "License"
    },
    {
      accessorKey: "driven_km",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Driven KMs
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "wage",
      header: "Wage/month ($100/km)"
    },
    {
      accessorKey: "type",
      header: "License type"
    },
    {
      accessorKey: "emission_date",
      header: "Emission date"
    },
    {
      accessorKey: "is_available_to_drive",
      header: "Able to drive"
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const driver = row.original
   
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
                      title: 'Are you sure you want to delete this driver?',
                      text: "You won't be able to revert this.",
                      icon: 'warning',
                      confirmButtonText: 'Delete',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6'
                    }).then(async (result) => {

                      //IF THE DRIVER DOESNT HAVE TRIPS
                      if (driver?.driven_km === 0) {
                        if(result.isConfirmed === true){
                          try{
                            const { data } = await axios.delete(`http://localhost:3001/drivers`, { data: driver })
  
                            if(data?.status === "success"){
                              revalidateDrivers();
                              Swal.fire({
                                title: `Driver deleted!`,
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
                      }else{
                        if(driver?.driven_km > 0){
                          //IF THE DRIVER HAS TRIPS (Double validation)
                          if(result.isConfirmed === true){
                            Swal.fire({
                              title: 'Confirmation required',
                              text: "This driver has trips and they will be deleted as well. Continue?",
                              icon: 'warning',
                              confirmButtonText: 'Delete',
                              showCancelButton: true,
                              confirmButtonColor: '#d33',
                              cancelButtonColor: '#3085d6'
                            }).then(async (result) => {
    
                              if (result.isConfirmed) {
                                try{
                                  const { data } = await axios.delete(`http://localhost:3001/drivers`, { data: driver })
        
                                  if(data?.status === "success"){
                                    revalidateDrivers();
                                    Swal.fire({
                                      title: `Driver deleted!`,
                                      icon: "success",
                                      toast: true,
                                      timer: 3000,
                                      showConfirmButton: false,
                                    });
                                  }
                                }catch(err){
                                  console.log(err)
                                }}
                            })
                          }
                          
                        }                        
                      }
                    })
                }}
              >
                Delete
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem style={{ cursor: "pointer" }}
                onClick={async () => {
                    Swal.fire({
                      title: 'Are you sure you want to renew this driver license?',
                      text: "You won't be able to revert this.",
                      icon: 'warning',
                      confirmButtonText: 'Renew license',
                      showCancelButton: true,
                      confirmButtonColor: '#6bc43b',
                      cancelButtonColor: '#d33'
                    }).then(async (result) => {
                        if(result.isConfirmed){
                          try{
                            const { data } = await axios.put(`http://localhost:3001/drivers/license`, { id: driver.id, today: new Date().toISOString().split('T')[0] })

                            if(data?.status === "success"){
                              revalidateDrivers();
                              Swal.fire({
                                title: `License renewed!`,
                                icon: "success",
                                toast: true,
                                timer: 3000,
                                showConfirmButton: false,
                              });
                            }
                          }catch(err){
                            console.log(err)
                          }}
                      })
                    }}                        
              >
                Renew license
              </DropdownMenuItem>


            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]