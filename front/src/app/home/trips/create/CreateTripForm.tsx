"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormControl, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirectToTrips } from "../../../lib/actions"
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

interface CreateTripFormProps {
    drivers: [],
    cars: [],
}

export default function CreateTripForm({drivers, cars}: CreateTripFormProps) {

    const formSchema = z.object({
        driver_id: z.string({required_error: "Driver is required"}),
        car_id: z.string({required_error: "Car is required"}),
        km: z.string({required_error: "Kms is required"}).min(1, "Kms is required").max(4, "Kms is too long")
    })

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            km: "1",
        },
        resolver: zodResolver(formSchema)
    })

    const handleSubmitNewTrip = async (formData: z.infer<typeof formSchema>) => {
        try {
            const { data } = await axios.post('http://localhost:3001/trips', {
            ...formData,
            date: new Date().toISOString().split('T')[0],
            hour: new Date().getHours(),
            minutes: new Date().getMinutes()
            })
            if(data.status === 'success') {
                redirectToTrips();
                Swal.fire({
                    title: 'Trip created successfully',
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
            <Link href="/home/trips"> <MoveLeft className="mr-3"/> Back to Trips</Link>
        </Button>


        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitNewTrip)}
            className="max-w-md w-full h-full flex flex-col gap-4 m-auto">

                <FormField
                    control={form.control}
                    name="driver_id"
                    render={({ field }) => {
                        return <FormItem>
                        <FormLabel>Driver</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a driver" />
                                </SelectTrigger>
                                <SelectContent>
                                    {drivers.map((driver: any) => (
                                        <SelectItem
                                        disabled={!driver.is_available_to_drive}
                                        key={driver.id}
                                        value={driver.id}>
                                            {driver.name} {driver.surname}
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
                    name="car_id"
                    render={({ field }) => {
                        return <FormItem>
                        <FormLabel>Car</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a car" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cars.map((car: any) => (
                                        <SelectItem
                                        disabled={!car.is_available}
                                        key={car.id}
                                        value={car.id}>
                                            {car.brand} {car.model} - {car.plate}
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
                    name="km"
                    render={({ field }) => {
                        return <FormItem className="w-full d-flex">
                        <FormLabel>KMs</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(e.target.value)} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    }}
                />

                <Button type="submit">Create new trip</Button>
            </form>
        </Form>
    </div>)
}