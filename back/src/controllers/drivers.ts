import db from "../db";

interface Driver {
    id: string,
    name: string,
    surname: string,
    dni: string,
    license: string,
    driven_km: number,
    is_available_to_drive?: boolean,
    emission_date?: string | undefined,
    license_type?: string | undefined,
    years_active?: number | undefined,
    wage?: string | undefined
}
    
const getAllDrivers = async () => { 

    try {

        const [result] = await db.query(`SELECT 
        d.id, d.name, d.surname, d.dni, d.driven_km, l.id AS license, l.emission_date, lt.years_active, lt.type FROM drivers AS d
        INNER JOIN licenses AS l ON d.id = l.driver_id
        INNER JOIN license_types AS lt ON l.license_type = lt.id
        `);
        
        
        result.map((driver: Driver) => {
            driver.id = Buffer.from(driver?.id).toString('hex')
            driver.license = Buffer.from(driver?.license).toString('hex')
            driver.emission_date = driver?.emission_date ? new Date(driver?.emission_date).toISOString().split('T')[0] : driver?.emission_date
            driver.is_available_to_drive = isAvailableToDrive(driver?.emission_date, driver?.years_active),
            driver.wage = `${driver?.driven_km * 100} $ARS`
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
                message: 'No drivers found',
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

const createDriver = async ({ name, surname, dni, driven_km, license_type, emission_date }: Driver) => {
    
    try {
        const [driver] = await db.query(`INSERT INTO drivers (name, surname, dni, driven_km) VALUES ('${name}', '${surname}', '${dni}', ${driven_km})`)

        if (driver.affectedRows === 1){
            const [fetchDriver] = await db.query(`SELECT * FROM drivers WHERE name = '${name}' AND surname = '${surname}' AND dni = '${dni}'`)
            
            try {
                const [license] = await db.query(`INSERT INTO licenses (license_type, driver_id, emission_date) VALUES (UNHEX('${license_type}'), UNHEX('${Buffer.from(fetchDriver[0]?.id).toString('hex')}'), '${emission_date}')`)
                if(license.affectedRows === 1) {
                    return{
                        status: 'success',
                        message: 'Driver created successfully',
                    }
                } else {
                    return{
                        status: 'error',
                        message: `Error creating driver's license`
                    }
                }
            } catch (error) {
                return{
                    status: 'error',
                    error: error
                }
            }            
        }else{
            return{
                status: 'error',
                message: 'Error creating driver'
            }
        }        
    } catch (error: unknown) {
        return{
            status: 'error',
            error: error
        }
    }
}

const renewLicense = async (id:string, today: string) => {

    try {
        const [renewLicense] = await db.query(`UPDATE licenses SET emission_date = '${today}' WHERE driver_id = UNHEX("${id}")`)
        if(renewLicense.affectedRows === 1) {
            return{
                status: 'success',
                message: 'License renewed successfully',
            }
        }

        return{
            status: 'error',
            message: 'Error renewing license'
        }
    } catch (error: unknown) {
        return{
            status: 'error',
            error: error
        }
    }
}

const deleteDriver = async (id: string) => {
    try {
        const [resultLicense] = await db.query(`DELETE FROM licenses WHERE driver_id = UNHEX("${id}")`)
        const [result] = await db.query(`DELETE FROM drivers WHERE id = UNHEX("${id}")`)
        
        if(result.affectedRows === 1) {
            return{
                status: 'success',
                message: 'Driver deleted successfully',
            }
        }
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

const deleteDriverAndTrips = async (id: string) => {
    try {
        const [resultTrip] = await db.query(`DELETE FROM trips WHERE driver_id = UNHEX("${id}")`)
        const [resultLicense] = await db.query(`DELETE FROM licenses WHERE driver_id = UNHEX("${id}")`)
        const [resultDriver] = await db.query(`DELETE FROM drivers WHERE id = UNHEX("${id}")`)
        
        if(resultDriver.affectedRows === 1) {
            return{
                status: 'success',
                message: 'Driver deleted successfully',
            }
        }
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

const isAvailableToDrive = (emission_date: any, years_active: any) => {
    const actualDate = new Date()
    const emissionDate = new Date(emission_date)
    const licenseExpiration = new Date(emissionDate.setFullYear(emissionDate.getFullYear() + years_active))
    if(actualDate > licenseExpiration) {
        return false 
    }
    return true
    
}


module.exports = {
    getAllDrivers,
    createDriver,
    deleteDriver,
    deleteDriverAndTrips,
    renewLicense,
}