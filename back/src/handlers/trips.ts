import { Request, Response, NextFunction } from 'express';

const { getAllTrips, createNewTrip, deleteTrip, getDriverCarRatio } = require('../controllers/trips');

export const handleGetAllTrips = async (req: Request, res: Response) => {
    try {
        const result = await getAllTrips();
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

export const handleCreateNewTrip = async (req: Request, res: Response) => {
    const { km, car_id, driver_id, hour, minutes, date } = req.body
    
    try {
        const result = await createNewTrip({ km, car_id, driver_id, hour, minutes, date });

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

export const handleDeleteTrip = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const result = await deleteTrip(id);
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

export const handleGetDriverCarRatio = async (req: Request, res: Response) => {
    try {
        const result = await getDriverCarRatio();
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
    handleGetAllTrips,
    handleCreateNewTrip,
    handleDeleteTrip,
    handleGetDriverCarRatio,
}