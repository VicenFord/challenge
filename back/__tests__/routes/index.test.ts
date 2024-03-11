const request = require('supertest');
const serverApp = require('../../src/server');
const axios = require('axios');

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
interface Car {
  id: string
  plate: string
  brand: string
  model: string
  year: number
  km: number
  is_available: boolean
}
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
interface LicenseTypes {
  id: string
  type: string
  years_active: number
}
//API TESTING FOR DRIVERS ROUTES:
describe('DRIVERS', () => {
  describe('GET all drivers', () => {
    it('should return all drivers from the database if there are any', async () => {
      const response = await request(serverApp).get('/drivers');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((driver: any) => {
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
      })
    });
  })

  describe('POST new driver', () => {
    it('should create a new driver in the database if the data is correct', async () => {
      
      const responseLicenses = await request(serverApp).get('/license-types');
      const idLicense = responseLicenses.body[0]?.id
  
    
      const payloadNewDriver = {
        name: 'John',
        surname: 'Doe',
        dni: '12345678',
        license_type: await idLicense,
        driven_km: 0,
        emission_date: `${new Date().toISOString().split('T')[0]}`,
      }
  
      const response = await request(serverApp).post('/drivers').send(payloadNewDriver);
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: expect.any(String),
        message: expect.any(String)
      })
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Driver created successfully');
    });
  })

  describe('PUT driver licence emission_date', () => {
    it('should update the driver emission_date in the database if the data is correct', async () => {
      
      const responseDrivers = await request(serverApp).get('/drivers');
      const idDriverJohnDoe = responseDrivers.body.filter((driver: any) => driver.name === 'John' && driver.surname === 'Doe')[0].id
    
      const payloadNewDriver = {
        id: await idDriverJohnDoe,
        today: `${new Date().toISOString().split('T')[0]}`,
      }

      const response = await request(serverApp).put('/drivers/license').send(payloadNewDriver);
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: expect.any(String),
        message: expect.any(String)
      })
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('License renewed successfully');
    })
  })

  describe('DELETE driver', () => {
    it('should delete the driver from the database if the data is correct', async () => {
      
      const responseDrivers = await request(serverApp).get('/drivers');
      const idDriverJohnDoe = responseDrivers.body.filter((driver: any) => driver.name === 'John' && driver.surname === 'Doe')[0].id
  
    
      const payloadNewDriver = {
        id: await idDriverJohnDoe,
      }
  
      const response = await request(serverApp).delete('/drivers').send(payloadNewDriver);
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: expect.any(String),
        message: expect.any(String)
      })
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Driver deleted successfully');
    });
  })



})





describe('CARS', () => {

  describe('GET all cars', () => {
    it('should return all cars from the database if there are any', async () => {
      const response = await request(serverApp).get('/cars');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((car: Car) => {
        expect(car).toMatchObject({
          id: expect.any(String),
          plate: expect.any(String),
          brand: expect.any(String),
          model: expect.any(String),
          year: expect.any(Number),
          km: expect.any(Number),
          is_available: expect.any(Boolean)
        })
      })
    });
  })

  describe('POST new car', () => {
    it('should create a new car in the database if the data is correct', async () => {
      
      const responseBrands = await request(serverApp).get('/car_brands');
      const idBrand = responseBrands.body[0]?.id

      const payloadNewCar = {
        plate: 'ABC 123',
        brand_id: await idBrand,
        model: 'RandomModelTest',
        year: `${new Date().getFullYear()}`,
        km: 0
      }

      const response = await request(serverApp).post('/cars').send(payloadNewCar);
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: expect.any(String),
        message: expect.any(String)
      })
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Car created successfully');
    })
  })

  describe('PUT car availability', () => {
    it('should update the car KMs to 0 in the database if the data is correct', async () => {
      
      const responseCars = await request(serverApp).get('/cars');
      const idCar = responseCars.body.filter((car: Car) => car.model === 'RandomModelTest')[0].id

      const payloadNewCar = {
        id: await idCar
      }

      const response = await request(serverApp).put('/cars').send(payloadNewCar);
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: expect.any(String),
        message: expect.any(String)
      })
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Car successfully marked as repaired');
    })
  })


  describe('DELETE car', () => {
    it('should delete the car from the database if the data is correct', async () => {
      
      const responseCars = await request(serverApp).get('/cars');
      const idCar = responseCars.body.filter((car: Car) => car.model === 'RandomModelTest')[0].id

      const payloadNewCar = {
        id: await idCar
      }

      const response = await request(serverApp).delete('/cars').send(payloadNewCar);
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: expect.any(String),
        message: expect.any(String)
      })
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Car and trips deleted successfully');
    })
  })



})

describe('TRIPS', () => {
  describe('GET all trips', () => {
    it('should return all trips from the database if there are any', async () => {
      const response = await request(serverApp).get('/trips');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((trip: Trips) => {
        expect(trip).toMatchObject({
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
      })
    })
  })

  describe('POST new trip', () => {
    it('should create a new trip in the database if the data is correct', async () => {
     
      const responseDrivers = await request(serverApp).get('/drivers');
      const idDriver = responseDrivers.body.filter((driver: any) => driver.is_available_to_drive === true)[0].id
  
      const responseCars = await request(serverApp).get('/cars');
      const idCar = responseCars.body.filter((car: any) => car.is_available === true)[0].id
  
      const payloadNewTrip = {
        km: 1,
        car_id: await idCar,
        driver_id: await idDriver,
        hour: `${new Date().getHours()}`,
        minutes: `${new Date().getMinutes()}`,
        date: `2024-02-29`
      }
  
      const response = await request(serverApp).post('/trips').send(payloadNewTrip);
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });
  })
  
  describe('GET trips car/driver ratio', () => {
    it('should return the car / driver ratio from each car with trips in the database', async () => {
     
      const response = await request(serverApp).get('/trips/ratio');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((tripRatio: any) => {
        expect(tripRatio).toMatchObject({
          plate: expect.any(String),
          brand: expect.any(String),
          model: expect.any(String),
          drivers: expect.any(Object),
          total_km_combined: expect.any(Number)
        })
      })      
    });
  })


  describe('DELETE trip', () => {
    it('should delete a trip in the database if the data is correct', async () => {
     
      const getTrips = await request(serverApp).get('/trips');
      const idTrip = getTrips.body.filter((trip: any) => trip.date === '2024-02-29')[0].id

      const payloadNewTrip = {
        id: await idTrip
      }

      const response = await request(serverApp).delete('/trips').send(payloadNewTrip);
      
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: expect.any(String),
        message: expect.any(String)
      })
      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Trip deleted successfully');
      
    });
  })
  
})


describe('CAR TYPES', () => {
  describe('GET all car brands', () => {
    it('should return all car types from the database if there are any', async () => {
      const response = await request(serverApp).get('/car_brands');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((carType: any) => {
        expect(carType).toMatchObject({
          id: expect.any(String),
          brand: expect.any(String)
        })
      })
    })
  })
})

describe('LICENSES TYPES', () => {
  describe('GET all licenses types', () => {
    it('should return all licenses types from the database if there are any', async () => {
      const response = await request(serverApp).get('/license-types');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach((licenseType: any) => {
        expect(licenseType).toMatchObject({
          id: expect.any(String),
          type: expect.any(String),
          years_active: expect.any(Number)
        })
      })
    })
  })
})
