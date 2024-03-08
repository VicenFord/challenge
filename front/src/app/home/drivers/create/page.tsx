import CreateDriverForm from "./CreateDriverForm";
import axios from "axios"

export default async function CreateDriverPage() {

    const { data } = await axios.get("http://localhost:3001/license-types")
    
    return (<div className="w-full h-full">
        <CreateDriverForm licenseTypes={data} />
    </div>)
}