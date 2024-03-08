import db from "../db";

interface LicenseTypes {
    id: string
    type: string
    years_active: number
}

const getAllLicenseTypes = async () => {
    try {
        const [result] = await db.query(`SELECT * FROM license_types`)
        result.map((licenseType: LicenseTypes) => {
            licenseType.id = Buffer.from(licenseType?.id).toString('hex')
        })

        if(result.length > 0) {
            return{
                status: 'success',
                data: result
            }
        }

        return{
            status: 'success',
            message: 'No license types found',
            data: []
        }
    } catch (error) {
        return{
            status: 'error',
            error: error
        }
    }
}

module.exports = {
    getAllLicenseTypes,
}