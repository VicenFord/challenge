const { getAllTrips, getDriverCarRatio } = require("../../src/controllers/trips");

interface Trips {
    id: string
    date: string
    hour: number
    minutes: number
    km: number
    name: string
    surname: string
    plate: string
    brand: string
    model: string
  }

describe('Testing GET all Trips', () => {
    it('Has to fetch all trips from the database if there are any and return them as an array of objects with the right properties', async () => {
        const result = await getAllTrips();
        
        expect(result.status).toBe('success');
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data).toBeInstanceOf(Array);
        result.data.forEach((trips: Trips) => { // check if it's an object with the right properties
            expect(trips).toMatchObject({
              id: expect.any(String),
              date: expect.any(String),
              hour: expect.any(Number),
              minutes: expect.any(Number),
              km: expect.any(Number),
              name: expect.any(String),
              surname: expect.any(String),
              plate: expect.any(String),
              brand: expect.any(String),
              model: expect.any(String),
            })
          });

    })
})

describe('Get driver-car ratio', () => {
    it('Should return the driver-car ratio', async () => {
        const result = await getDriverCarRatio();
        
        expect(result.status).toBe('success');
        expect(result.data).toBeInstanceOf(Array);
        result.data.forEach((car: any) => {
            expect(car).toMatchObject({
                plate: expect.any(String),
                brand: expect.any(String),
                model: expect.any(String),
                drivers: expect.any(Object),
                total_km_combined: expect.any(Number),
              })
        });
    })
})
