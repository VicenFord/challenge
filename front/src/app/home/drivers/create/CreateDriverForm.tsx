"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { REVandREDdrivers} from "../../../lib/actions"
import Swal from "sweetalert2"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Link from "next/link"
import { CalendarIcon, MoveLeft } from 'lucide-react';
import axios from "axios"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface CreateDriverFormProps {
    licenseTypes: [],
}

export default function CreateTripForm({licenseTypes}: CreateDriverFormProps) {

    const formSchema = z.object({
        name: z.string({required_error: "Name is required"}).min(2, "Name is too short").max(30, "Name is too long"),
        surname: z.string({required_error: "Surname is required"}).min(2, "Surname is too short").max(30, "Surname is too long"),
        dni: z.string({required_error: "DNI is required"}).min(7, "DNI is too short").max(8, "DNI is too long"),
        license_type: z.string({required_error: "License type is required"}),
        emission_date: z.date({required_error: "Emission date is required"}).transform(date => format(date, 'yyyy-MM-dd')),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
            surname: "",
            dni: "",
        },
        resolver: zodResolver(formSchema)
    })

    const handleSubmitNewDriver = async (formData: z.infer<typeof formSchema>) => {
        try {
            const { data } = await axios.post('http://localhost:3001/drivers/create', {
            ...formData,
            driven_km: 0
            })
            
            if(data.status === 'success') {
                REVandREDdrivers();
                Swal.fire({
                    title: 'Driver created successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div className="w-full h-full">


        <Button asChild variant="default" className="mb-10">
            <Link href="/home/drivers"> <MoveLeft className="mr-3"/> Back to Drivers</Link>
        </Button>


        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitNewDriver)}
            className="max-w-md w-full h-full flex flex-col gap-4 m-auto">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                        return <FormItem className="w-full d-flex">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Name" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    }}
                />

                <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => {
                        return <FormItem className="w-full d-flex">
                        <FormLabel>Surname</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Surname" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    }}
                />

                <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => {
                        return <FormItem className="w-full d-flex">
                        <FormLabel>DNI (Without dots)</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="DNI" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    }}
                />

                <FormField
                    control={form.control}
                    name="license_type"
                    render={({ field }) => {
                        return <FormItem>
                        <FormLabel>License Type</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select license" />
                                </SelectTrigger>
                                <SelectContent>
                                    {licenseTypes.map((license: any) => (
                                        <SelectItem
                                        key={license.id}
                                        value={license.id}>
                                            {license.type} ({license.years_active}-year authorization)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    }}
                />

                <FormField
                control={form.control}
                name="emission_date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Emission Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value as any}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        The emission date of your current driver license
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <Button type="submit">Create new driver</Button>
            </form>
        </Form>
    </div>)
}