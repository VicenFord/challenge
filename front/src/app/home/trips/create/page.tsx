import CreateTripForm from "./CreateTripForm";
import axios from "axios";


export default async function CreateTripPage() {

    const drivers = await axios.get("http://localhost:3001/drivers")
    const cars = await axios.get("http://localhost:3001/cars")

    return (<div className="w-full h-full">
        <CreateTripForm drivers={drivers.data} cars={cars.data} />
    </div>)
}