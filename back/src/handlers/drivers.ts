import { Request, Response, NextFunction } from 'express';

const { getAllDrivers, createDriver, deleteDriver } = require('../controllers/drivers');

const handleGetAllDrivers = async (req: Request, res: Response) => {
    try {
        const result = await getAllDrivers();
        if(result.status === 'success') {
            res.status(200).send(result.data);
        }
        else {
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).send(error);
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

const handleDeleteDriver = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const result = await deleteDriver(id);
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

module.exports = {
    handleGetAllDrivers,
    handleCreateDriver,
    handleDeleteDriver,
}