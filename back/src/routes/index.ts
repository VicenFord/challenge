const routes = require("express").Router();

const { handleGetAllDrivers, handleCreateDriver, handleDeleteDriver } = require("../handlers/drivers");
const { handleGetAllCars, handleCreateNewCar, handleDeleteCar, handleRepairCar } = require("../handlers/cars");
const { handleGetAllTrips, handleCreateNewTrip, handleDeleteTrip, handleGetDriverCarRatio } = require("../handlers/trips");
const { handleGetAllLicenseTypes } = require("../handlers/license-types");
const { handleGetAllCarBrands } = require("../handlers/car_brands");

//Routes for drivers
routes.get("/drivers", handleGetAllDrivers);
routes.post("/drivers/create", handleCreateDriver);
routes.delete("/drivers", handleDeleteDriver);


//Routes for cars
routes.get("/cars", handleGetAllCars);
routes.post("/cars", handleCreateNewCar);
routes.delete("/cars", handleDeleteCar);
routes.put("/cars", handleRepairCar);

//Routes for car_brands
routes.get("/car_brands", handleGetAllCarBrands);

//Routes for trips
routes.get("/trips", handleGetAllTrips);
routes.delete("/trips", handleDeleteTrip);
routes.post("/trips/create", handleCreateNewTrip);
routes.get("/trips/ratio", handleGetDriverCarRatio);

//Routes for license-types
routes.get("/license-types", handleGetAllLicenseTypes);

module.exports = routes;