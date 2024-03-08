const { getAllCars } = require("../../src/controllers/cars");

interface Car {
    id: string
    plate: string
    brand: string
    model: string
    year: number
    km: number
    is_available: boolean
  }

describe('Testing GET all Cars', () => {
    it('Has to fetch all cars from the database if there are any and return them as an array of objects with the right properties', async () => {
        const result = await getAllCars();
        
        expect(result.status).toBe('success');
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data).toBeInstanceOf(Array);
        result.data.forEach((car: Car) => { // check if it's an object with the right properties
            expect(car).toMatchObject({
              id: expect.any(String),
              plate: expect.any(String),
              brand: expect.any(String),
              model: expect.any(String),
              year: expect.any(Number),
              km: expect.any(Number),
              is_available: expect.any(Boolean)
            })
          });

    })
})
