const { getAllLicenseTypes } = require("../../src/controllers/license-types");

interface LicenseTypes {
    id: string
    type: string
    years_active: number
}

describe('Testing GET all License Types', () => {
    it('Has to fetch all license types from the database if there are any and return them as an array of objects with the right properties', async () => {
        const result = await getAllLicenseTypes();
        
        expect(result.status).toBe('success');
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data).toBeInstanceOf(Array);
        result.data.forEach((licenseType: LicenseTypes) => { // check if it's an object with the right properties
            expect(licenseType).toMatchObject({
              id: expect.any(String),
              type: expect.any(String),
              years_active: expect.any(Number)
            })
          });

    })
})
