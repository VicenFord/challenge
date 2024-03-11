import { Request, Response, NextFunction } from 'express';

const { getAllCars, createNewCar, deleteCarAndTrips, repairCar,  } = require('../controllers/cars');

const handleGetAllCars = async (req: Request, res: Response) => {
    try {
        const result = await getAllCars();
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

const handleCreateNewCar = async (req: Request, res: Response) => {
    const { plate, brand_id, model, year, km } = req.body
    try {
        
        const result = await createNewCar({ plate, brand_id, model, year, km });
        
        if(result.status === 'success') {
            return res.status(200).json(result);
        }
        
        return res.status(500).json(result);

    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

const handleDeleteCarAndTrips = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const result = await deleteCarAndTrips(id);
        if(result.status === 'success') {
            return res.status(200).json(result);
        }
        return res.status(500).json(result);
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

const handleRepairCar = async (req: Request, res: Response) => {
    const { id } = req.body
    
    try {
        const result = await repairCar(id);
        if(result.status === 'success') {
            return res.status(200).json(result);
        }
        return res.status(500).json(result);
    } catch (error: any) {
        return{
            status: 'error',
            error: error.message
        }
    }
}

module.exports = {
    handleGetAllCars,
    handleCreateNewCar,
    handleDeleteCarAndTrips,
    handleRepairCar,
}