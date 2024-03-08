import { Request, Response, NextFunction } from 'express';

const { getAllCarBrands } = require('../controllers/car_brands');


const handleGetAllCarBrands = async (req: Request, res: Response) => {
    try {
        const result = await getAllCarBrands();

        if(result.status === 'success') {
            return res.status(200).send(result.data);
        }        

        return res.status(500).json(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    handleGetAllCarBrands,
}