"use server"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function revalidateDrivers () {
    revalidatePath('/home/drivers');
}
export async function redirectToDrivers () {
    redirect('/home/drivers')
}

export async function revalidateVehicles () {
    revalidatePath('/home/vehicles');
}
export async function redirectToVehicles () {
    redirect('/home/vehicles')
}

export async function revalidateUsage () {
    revalidatePath('/home/vehicles/usage');
}
export async function redirectToUsage () {
    redirect('/home/vehicles/usage')
}

export async function revalidateTrips () {
    revalidatePath('/home/trips');
}
export async function redirectToTrips () {
    redirect('/home/trips')
}