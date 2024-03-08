/* Selecting the database */
USE virtualisa_challenge_DB;

/* Creation of the table 'car_brands' */
CREATE TABLE IF NOT EXISTS car_brands (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    brand VARCHAR(255) NOT NULL
);

/* Insertion of data in the table 'car_brands' */
INSERT INTO car_brands (brand) VALUES ('Toyota');
INSERT INTO car_brands (brand) VALUES ('Honda');
INSERT INTO car_brands (brand) VALUES ('Ford');
INSERT INTO car_brands (brand) VALUES ('Chevrolet');
INSERT INTO car_brands (brand) VALUES ('Volkswagen');
INSERT INTO car_brands (brand) VALUES ('Fiat');
INSERT INTO car_brands (brand) VALUES ('Renault');
INSERT INTO car_brands (brand) VALUES ('Peugeot');
INSERT INTO car_brands (brand) VALUES ('Citroen');
INSERT INTO car_brands (brand) VALUES ('Nissan');

/* Storing the ids of the 'car_brands' in variables */
SET @brand_id_toyota = (SELECT id FROM car_brands WHERE brand = 'Toyota');
SET @brand_id_honda = (SELECT id FROM car_brands WHERE brand = 'Honda');
SET @brand_id_ford = (SELECT id FROM car_brands WHERE brand = 'Ford');
SET @brand_id_chevrolet = (SELECT id FROM car_brands WHERE brand = 'Chevrolet');
SET @brand_id_volkswagen = (SELECT id FROM car_brands WHERE brand = 'Volkswagen');
SET @brand_id_fiat = (SELECT id FROM car_brands WHERE brand = 'Fiat');
SET @brand_id_renault = (SELECT id FROM car_brands WHERE brand = 'Renault');
SET @brand_id_peugeot = (SELECT id FROM car_brands WHERE brand = 'Peugeot');
SET @brand_id_citroen = (SELECT id FROM car_brands WHERE brand = 'Citroen');
SET @brand_id_nissan = (SELECT id FROM car_brands WHERE brand = 'Nissan');

/* Creation of the table 'cars' */
CREATE TABLE IF NOT EXISTS cars (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    plate VARCHAR(255) NOT NULL,
    brand_id BINARY(16) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    km INT NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES car_brands(id)
);

/* Insertion of data in the table 'cars' */
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('GEB 342', @brand_id_toyota, 'Corolla', 2018, 2500);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('DS 243 GW', @brand_id_toyota, 'Etios', 2019, 10000);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('KJS 925', @brand_id_honda, 'Civic', 2010, 15001);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('JH 342 UF', @brand_id_ford, 'Focus', 2020, 5000);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('CPL 624', @brand_id_ford, 'Escort', 1998, 21040);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('KD 014 SC', @brand_id_chevrolet, 'Cruze', 2021, 2000);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('IG 101 JH', @brand_id_chevrolet, 'Corsa', 2007, 14000);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('KGR 749', @brand_id_volkswagen, 'Golf', 2017, 7000);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('UQI 841', @brand_id_volkswagen, 'Vento', 2015, 9500);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('PQ 889 VV', @brand_id_fiat, 'Panda', 2022, 1000);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('GG 244 RW', @brand_id_renault, 'Nevada', 1999, 13400);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('JH 555 OA', @brand_id_peugeot, '308', 2010, 17000);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('PLC 111', @brand_id_citroen, 'C3', 2020, 3500);
INSERT INTO cars (plate, brand_id, model, year, km) VALUES ('FF 778 QR', @brand_id_nissan, 'Juke', 2021, 15150);


/* Creation of the table 'license_types' */
CREATE TABLE IF NOT EXISTS license_types (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    type VARCHAR(255) NOT NULL,
    years_active INT NOT NULL
);

/* Insertion of data in the table 'license_types' */
INSERT INTO license_types (type, years_active) VALUES ('Professional', 1);
INSERT INTO license_types (type, years_active) VALUES ('Personal', 5);

/* Storing the ids of the 'license_types' in variables */
SET @license_type_id_professional = (SELECT id FROM license_types WHERE type = 'Professional');
SET @license_type_id_personal = (SELECT id FROM license_types WHERE type = 'Personal');

/* Creation of the table 'drivers' */
CREATE TABLE IF NOT EXISTS drivers (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    dni VARCHAR(255) NOT NULL,
    driven_km INT NOT NULL
);

/* Insertion of data in the table 'drivers' */
INSERT INTO drivers (name, surname, dni, driven_km) VALUES ('Candela', 'Lofredo', '38651841', 0);
INSERT INTO drivers (name, surname, dni, driven_km) VALUES ('Pedro', 'Sanchez', '9455833', 0);
INSERT INTO drivers (name, surname, dni, driven_km) VALUES ('Jose', 'Paredes', '24995040', 0);
INSERT INTO drivers (name, surname, dni, driven_km) VALUES ('Maria', 'Lopez', '37611732', 0);
INSERT INTO drivers (name, surname, dni, driven_km) VALUES ('Carlos', 'Gonzalez', '38651841', 0);
INSERT INTO drivers (name, surname, dni, driven_km) VALUES ('Ramona', 'Feliciano', '19855650', 0);
INSERT INTO drivers (name, surname, dni, driven_km) VALUES ('Dario', 'Fuseneco', '22065467', 0);

/* Storing the ids of the 'drivers' in variables */
SET @driver_id_candela = (SELECT id FROM drivers WHERE name = 'Candela' AND surname = 'Lofredo' AND dni = '38651841');
SET @driver_id_pedro = (SELECT id FROM drivers WHERE name = 'Pedro' AND surname = 'Sanchez' AND dni = '9455833');
SET @driver_id_jose = (SELECT id FROM drivers WHERE name = 'Jose' AND surname = 'Paredes' AND dni = '24995040');
SET @driver_id_maria = (SELECT id FROM drivers WHERE name = 'Maria' AND surname = 'Lopez' AND dni = '37611732');
SET @driver_id_carlos = (SELECT id FROM drivers WHERE name = 'Carlos' AND surname = 'Gonzalez' AND dni = '38651841');
SET @driver_id_ramona = (SELECT id FROM drivers WHERE name = 'Ramona' AND surname = 'Feliciano' AND dni = '19855650');
SET @driver_id_dario = (SELECT id FROM drivers WHERE name = 'Dario' AND surname = 'Fuseneco' AND dni = '22065467');

/* Creation of the table 'licenses' */
CREATE TABLE IF NOT EXISTS licenses (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    license_type BINARY(16) NOT NULL,
    driver_id BINARY(16) NOT NULL,
    emission_date DATE NOT NULL,
    FOREIGN KEY (license_type) REFERENCES license_types(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

/* Insertion of data in the table 'licenses' */
INSERT INTO licenses (license_type, driver_id, emission_date) VALUES (@license_type_id_professional, @driver_id_candela, '2024-02-25');
INSERT INTO licenses (license_type, driver_id, emission_date) VALUES (@license_type_id_personal, @driver_id_pedro, '2018-05-01');
INSERT INTO licenses (license_type, driver_id, emission_date) VALUES (@license_type_id_professional, @driver_id_jose, '2023-03-01');
INSERT INTO licenses (license_type, driver_id, emission_date) VALUES (@license_type_id_professional, @driver_id_maria, '2024-01-09');
INSERT INTO licenses (license_type, driver_id, emission_date) VALUES (@license_type_id_personal, @driver_id_carlos, '2022-10-28');
INSERT INTO licenses (license_type, driver_id, emission_date) VALUES (@license_type_id_personal, @driver_id_ramona, '2024-02-18');
INSERT INTO licenses (license_type, driver_id, emission_date) VALUES (@license_type_id_professional, @driver_id_dario, '2023-12-23');


/* Creation of the table 'trips' */
CREATE TABLE IF NOT EXISTS trips (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    km INT NOT NULL,
    car_id BINARY(16) NOT NULL,
    driver_id BINARY(16) NOT NULL,
    date VARCHAR(255) NOT NULL,
    hour INT NOT NULL,
    minutes INT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);