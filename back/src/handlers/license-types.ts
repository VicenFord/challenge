import { Request, Response, NextFunction } from 'express';

const { getAllLicenseTypes } = require('../controllers/license-types');


export const handleGetAllLicenseTypes = async (req: Request, res: Response) => {
    try {
        const result = await getAllLicenseTypes();
        if(result.status === 'success') {
            res.status(200).json(result.data);
        }
        else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    handleGetAllLicenseTypes,
}