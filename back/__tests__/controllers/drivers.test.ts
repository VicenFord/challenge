const { getAllDrivers, createDriver } = require("../../src/controllers/drivers");

interface Driver {
    id: string
    name: string
    surname: string
    dni: string
    license: string
    driven_km: number
    is_available_to_drive: boolean
    emission_date: string
    type: string
    years_active: number
    wage: string
}

describe('Testing GET all Drivers',  () => {
    it('Has to fetch all drivers from the database if there are any and return them as an array of objects with the right properties', async () => {
        const result = await getAllDrivers();
        
        expect(result.status).toBe('success');
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data).toBeInstanceOf(Array);
        result.data.forEach((driver: Driver) => { // check if it's an object with the right properties
            expect(driver).toMatchObject({
              id: expect.any(String),
              name: expect.any(String),
              surname: expect.any(String),
              dni: expect.any(String),
              license: expect.any(String),
              driven_km: expect.any(Number),
              is_available_to_drive: expect.any(Boolean),
              emission_date: expect.any(String),
              type: expect.any(String),
              years_active: expect.any(Number),
              wage: expect.any(String)
            })
          });
    })
})

describe('Testing POST new Driver', () => {
    it('Has to create a new driver in the database and return the new driver as an object with the right properties', async () => {
        const payloadNewDriver = {
            name: "John",
            surname: "Doe",
            dni: "12345678",
            license_type: "c60dcc92d9ad11ee9ac4f9d3348916d0",
            driven_km: 0,
            emission_date: "2023-03-21"
        }

        const result = await createDriver({...payloadNewDriver});
        
        expect(result.status).toBe('success');
        expect(result).toMatchObject({
            status: 'success',
            message: 'Driver created successfully'
        })
    })
})