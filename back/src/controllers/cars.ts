import db from "../db";

interface Car {
    id: string,
    plate: string,
    is_available: boolean | 0 | 1,
    brand_id: string,
    model: string,
    year: number,
    km: number,
}

const getAllCars = async () => {    
    try {
        const [result] = await db.query(`
        SELECT c.id, UPPER(c.plate) AS plate, b.brand, c.model, c.year, c.km FROM cars AS c
        INNER JOIN car_brands AS b
        ON c.brand_id = b.id
        `)

        result.map((car: Car) => {
            car.id = Buffer.from(car?.id).toString('hex');
            car.is_available = car.km > 15000 ? false : true
        })

        if(result.length > 0) {
            return{
                status: 'success',
                data: result
            }
        }
        else {
            return{
                status: 'success',
                message: 'No cars found',
                data: []
            }
        }

    } catch (error: unknown) {
        return{
            status: 'error',
            error: error
        }
    }
}

const createNewCar = async ({ plate, brand_id, model, year, km }: Car) => {

    try {
        const [result] = await db.query(`INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('${plate}', UNHEX('${brand_id}'), '${model}', ${year}, ${km});`)
        
        if(result) {
            return{
                status: 'success',
                message: 'Car created successfully',
            }
        }

        return{
            status: 'error',
            message: 'Error creating car'
        }
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

const deleteCar = async (id: string) => {
    try {
        const [result] = await db.query(`DELETE FROM cars WHERE id = UNHEX("${id}")`)
        
        if(result) {
            return{
                status: 'success',
                message: 'Car deleted successfully',
            }
        }

        return{
            status: 'error',
            message: 'Error deleting car'
        }
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

const repairCar = async (id: string) => {
    
    try {
        const [result] = await db.query(`UPDATE cars SET km = 0 WHERE id = UNHEX("${id}")`)
        
        if(result) {
            return{
                status: 'success',
                message: 'Car successfully marked as repaired',
            }
        }

        return{
            status: 'error',
            message: 'Error repairing car'
        }
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

module.exports = {
    getAllCars,
    createNewCar,
    deleteCar,
    repairCar,
}