"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { revalidateVehicles } from "../../../lib/actions"
import Swal from "sweetalert2"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Link from "next/link"
import { MoveLeft } from 'lucide-react';
import axios from "axios"

interface CreateVehicleFormProps {
    carBrands: [],
}

export default function CreateVehicleForm({carBrands}: CreateVehicleFormProps) {

    const formSchema = z.object({
        plate: z.string({required_error: "Plate is required"}).min(7, "Plate is too short").max(9, "Plate is too long"),
        brand_id: z.string({required_error: "Brand is required"}),
        model: z.string({required_error: "Model is required"}).max(30, "Model is too long"),
        year: z.string({required_error: "Year is required"}).min(4, "Year is too short").max(4, "Year is too long").refine(value => {
            const year = parseInt(value);
            const currentYear = new Date().getFullYear();
            return year > 1980 && year <= currentYear;
        }, {
            message: 'El año debe ser mayor que 1980 y menor o igual a este año',
        }),
        km: z.string({required_error: "Km is required"}).min(1, "Please enter the number of KMs").max(6, "The car has too many KMs").refine(value => {
            return parseInt(value)
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            plate: "",
            model: "",
            year: "",
            km: "",
        },
        resolver: zodResolver(formSchema)
    })

    const handleSubmitNewTrip = async (formData: z.infer<typeof formSchema>) => {
        try {
            const { data } = await axios.post('http://localhost:3001/cars', {
            ...formData
            })
            
            if(data.status === 'success') {
                revalidateVehicles();
                Swal.fire({
                    title: 'Vehicle created successfully',
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

        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitNewTrip)}
            className="max-w-md w-full h-full flex flex-col gap-4 m-auto">

                <FormField
                    control={form.control}
                    name="brand_id"
                    render={({ field }) => {
                        return <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a driver" />
                                </SelectTrigger>
                                <SelectContent>
                                    {carBrands.map((brand: any) => (
                                        <SelectItem
                                        key={brand.id}
                                        value={brand.id}>
                                            {brand.brand}
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
                    name="plate"
                    render={({ field }) => {
                        return <FormItem className="w-full d-flex">
                        <FormLabel>Plate</FormLabel>
                        <FormControl>
                            <Input type="text" pattern="^[^-]*$" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                            The license plate of the vehicle using space, not dash (ABC 123 or AB 123 CD)
                        </FormDescription>
                        </FormItem>
                    }}
                />

                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => {
                        return <FormItem className="w-full d-flex">
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    }}
                />

                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => {
                        return <FormItem className="w-full d-flex">
                        <FormLabel>Year of the vehicle</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    }}
                />

                <FormField
                    control={form.control}
                    name="km"
                    render={({ field }) => {
                        return <FormItem className="w-full d-flex">
                        <FormLabel>KMs</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                            The number of kilometers the vehicle has
                        </FormDescription>
                        </FormItem>
                    }}
                />

                <Button type="submit">Create new vehicle</Button>
            </form>
        </Form>
    </div>)
}