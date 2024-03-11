import { Request, Response, NextFunction } from 'express';

const { getAllDrivers, createDriver, deleteDriver, deleteDriverAndTrips, renewLicense } = require('../controllers/drivers');

const handleGetAllDrivers = async (req: Request, res: Response) => {
    try {
        const result = await getAllDrivers();
        if(result.status === 'success') {
            return res.status(200).send(result.data);
        }
        else {
            return res.status(500).json(result);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}

const handleCreateDriver = async (req: Request, res: Response) => {
    const { name, surname, dni, driven_km, license_type, emission_date } = req.body
    try {        
        const result = await createDriver({ name, surname, dni, driven_km, license_type, emission_date });
        if(result.status === 'success') {
            res.status(200).json(result);
        }
        else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const handleRenewLicense = async (req: Request, res: Response) => {
    const { id, today } = req.body
    try {
        const result = await renewLicense(id, today);
        if(result.status === 'success') {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const handleDeleteDriver = async (req: Request, res: Response) => {
    const { id, driven_km } = req.body

    if(driven_km > 0) {
        try {
            const result = await deleteDriverAndTrips(id);
            if(result.status === 'success') {
                return res.status(200).json(result);
            }
            else {
                return res.status(500).json(result);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }


    try {
        const result = await deleteDriver(id);
        if(result.status === 'success') {
            return res.status(200).json(result);
        }
        else {
            return res.status(500).json(result);
        }
    } catch (error) {
        return res.status(500).json(error);
    }    
}


module.exports = {
    handleGetAllDrivers,
    handleCreateDriver,
    handleDeleteDriver,
    handleRenewLicense,
}