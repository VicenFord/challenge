import db from "../db";


const getAllCarBrands = async () => {
    try {
        const [carBrands] = await db.query(`SELECT id, brand FROM car_brands`)
        
        carBrands.map((carBrand: any) => {
            carBrand.id = Buffer.from(carBrand?.id).toString('hex')
        })

        if(carBrands.length > 0) {
            return{
                status: 'success',
                data: carBrands
            }
        }
        return{
            status: 'error',
            message: 'No car brands found',
            data: []
        }

    } catch (error: unknown) {
        return{
            status: 'error',
            error: error
        }
    }
}

module.exports = {
    getAllCarBrands,
}