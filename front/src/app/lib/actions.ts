"use server"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function revalidateTrips () {
    revalidatePath('/home/trips');
    redirect('/home/trips')
}

export async function revalidateVehicles () {
    revalidatePath('/home/vehicles');
    redirect('/home/vehicles')
}
export async function onlyRevalidateTrips () {
    revalidatePath('/home/trips');
}

export async function onlyRevalidateDrivers () {
    revalidatePath('/home/drivers');
}

export async function redirectToTrips () {
    redirect('/home/trips')
}

export async function REVandREDdrivers () {
    revalidatePath('/home/drivers');
    redirect('/home/drivers')
}

export async function revalidateAll() {
    revalidatePath('/home/vehicles');
    revalidatePath('/home/drivers');
    revalidatePath('/home/trips');
    revalidatePath('/home/vehicles/usage');
}

export async function onlyRevalidateUsage () {
    revalidatePath('/home/vehicles/usage');
}