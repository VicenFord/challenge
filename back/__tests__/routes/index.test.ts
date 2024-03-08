const request = require('supertest');
const serverApp = require('../../src/server');

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

describe('Route GET ALL DRIVERS', () => {
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

describe('Route POST new DRIVER', () => {
  it('should create a new driver in the database if the data is correct', async () => {
    const payloadNewDriver = {
      name: 'John',
      surname: 'Doe',
      dni: '12345678',
      license_type: 'c60dcc92d9ad11ee9ac4f9d3348916d0',
      driven_km: 0,
      emission_date: '2023-03-21'
    }

    const response = await request(serverApp).post('/drivers/create').send(payloadNewDriver);
    
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: expect.any(String),
      message: expect.any(String)
    })
  });
})

describe('Route GET ALL CARS', () => {
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

describe('GET ALL TRIPS', () => {
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

describe('POST trips', () => {
  it('should create a new trip in the database if the data is correct', async () => {

    const payloadNewTrip = {
      km: 1,
      car_id: '8bb8afb2d9a311ee9ac4f9d3348916d0',
      driver_id: 'b0fc889adaeb11ee98f3ae63e6580718',
      hour: 12,
      minutes: 30,
      date: '2023-03-21'
    }

    const response = await request(serverApp).post('/trips/create').send(payloadNewTrip);
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });
})