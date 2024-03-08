import db from "../db";

interface createNewTripProps {
    km: string,
    car_id: string,
    driver_id: string,
    hour: number,
    minutes: number,
    date: string,
}

interface Trips {
    id: string
    date: string
    hour: number | string
    minutes: number
    km: number
    name: string
    surname: string
    plate: string
    brand: string
    model: string
}

const getAllTrips = async () => {
    try{
        const [result] = await db.query(`
            SELECT t.id, t.date, t.hour, t.minutes, t.km, d.name, d.surname, c.plate, cb.brand, c.model FROM trips as t
            JOIN cars as c ON c.id = t.car_id
            JOIN car_brands as cb ON cb.id = c.brand_id
            JOIN drivers as d ON d.id = t.driver_id
        `)
        result.map((trip: Trips) => {
            trip.id = Buffer.from(trip?.id).toString('hex')
        })


        if(result.length > 0) {
            return{
                status: 'success',
                data: result
            }
        }

        return{
            status: 'success',
            message: 'No trips found',
            data: []
        }
        
    }catch(error: any){
        return{
            status: 'error',
            error: error.message
        }
    }
}

const createNewTrip = async ({ km, car_id, driver_id, hour, minutes, date }: createNewTripProps) => {
    try {
        const [result] = await db.query(`INSERT INTO trips (km, car_id, driver_id, hour, minutes, date) VALUES (${Number(km)}, UNHEX("${car_id}"), UNHEX("${driver_id}"), ${hour}, ${minutes}, '${date}')`)
        const [sumKMtoDriver] = await db.query(`UPDATE drivers SET driven_km = driven_km + ${Number(km)} WHERE id = UNHEX("${driver_id}")`)
        const [sumKMtoCar] = await db.query(`UPDATE cars SET km = km + ${Number(km)} WHERE id = UNHEX("${car_id}")`)
        
        if(result) {
            return{
                status: 'success',
                data: result
            }
        }

        return{
            status: 'error',
            error: 'Something went wrong'
        }
        
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}
const deleteTrip = async (id: string) => {
    try {
        const [result] = await db.query(`DELETE FROM trips WHERE id = UNHEX("${id}")`)
        
        if(result) {
            return{
                status: 'success',
                message: 'Trip deleted successfully',
            }
        }
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

const getDriverCarRatio = async () =>{
    try {
        const [result] = await db.query(`SELECT cb.brand, c.model, c.plate, SUM(t.km) AS total_km, d.name, d.surname FROM trips AS t
        JOIN cars AS c ON c.id = t.car_id
        JOIN car_brands AS cb ON cb.id = c.brand_id
        JOIN drivers AS d ON d.id = t.driver_id
        GROUP BY car_id, driver_id;
        `)

        if (result) {
            const ratio: {[plate: string]: any} = {};
            const ratioArray: any[] = [];
        
            // Organizar los datos
            result.forEach((entry: any) => {
                const { plate, brand, model, total_km, name, surname } = entry;
        
                if (!ratio[plate]) {
                    ratio[plate] = {
                        plate: plate,
                        info: {
                            plate: plate,
                            brand: brand,
                            model: model,
                            drivers: {},
                            total_km_combined: 0
                        }
                    };
                }
        
                const driverKey = `${name} ${surname}`;
                ratio[plate].info.drivers[driverKey] = (ratio[plate].info.drivers[driverKey] || 0) + parseInt(total_km);
                ratio[plate].info.total_km_combined += parseInt(total_km);
            });
        
            // Convertir el objeto ratio en un array de objetos
            Object.values(ratio).forEach((value: any) => {
                ratioArray.push(value.info);
            });
        
            return {
                status: 'success',
                data: ratioArray
            };
        }
        

    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

module.exports = {
    getAllTrips,
    createNewTrip,
    deleteTrip,
    getDriverCarRatio,
}