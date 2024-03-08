# Bienvenido a Virtualisa Drive APP!

## Descripción
En este documento estan los pasos a seguir para poder inicializar el proyecto desde tu computadora local.

Es una App de gestion de remiseria donde vas a poder añadir autos, conductores, viajes, ver el estado de la licencia de conducir de cada uno de los empleados, el estado de los vehiculos, cuales estan habilitados, ver tablas con los conductores que mas kilometros realizaron, cual es el uso de cada vehiculo correspondiente a cada conductor y mucho mas!

# Setup:
Para poder inicializar la app localmente, vamos a seguir los siguientes pasos:
1. Abrimos una terminal en la carpeta "back" y ejecutamos en la consola el comando:
```bash
npm install
```
2. Abrimos una segunda terminal esta vez en la carpeta "front" y ejecutamos en la consola el comando:
```bash
npm install
```
3. Levantamos MySQL en nuestro enterno y creamos una DATABASE en MySQL llamada " *virtualisa_challenge_DB* " (Ese es su nombre por defecto, la podes nombrar como gustes pero si se le cambia el nombre (Ej: " my_DB ") **hay que cambiarlo también** en la primera linea de **seed.sql** para que coincidan).

### Para crear la conexión:

4. Dentro del editor de codigo, crear una conexion con nuestra DB de MySQL del proyecto (El uso de la extension **SQLTools** es recomendada: Instalar la extension *SQLTools* y otra llamada *SQLTools MySQL/MariaDB/TiDB*).
- Para crear la conexion, entrar a la pestaña de SQLTools del editor de codigo y hacemos click en **Connections -> Add new connection**.
- Seleccionamos MySQL
- Completamos solamente los campos "Connection name" (por default completamos con **localhost**), "Database" (Escribimos **virtualisa_challenge_DB** o el nombre con el que llamamos a nuestra base de datos para el proyecto) y el "Username" (por default completamos con **root** o tu nombre de usuario que usas para MySQL)
- Bajamos y abajo a la derecha clickeamos en "TEST CONNECTION", y si se nos pone en verde, clickeamos en "SAVE CONNECTION".

### Para usar nuestra DB en el poryecto:
5. Creamos un **.env** dentro de nuestra carpeta "back" con este formato:

```javascript
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
EXPRESS_PORT=
```
Con tus datos de MySQL (Host, Port, User, Password, Database que vamos a usar(la que creaste al comienzo) y el puerto donde queremos que corra el servidor de Express)

### Poblamos nuestra DB con datos iniciales:
- Nos dirigimos a **seed.sql** (Recordemos que si cambiamos el nombre por otro que no sea " virtualisa_challenge_DB " , poner el nombre correcto en la primera linea) y ejecutamos el script.


## Correr la App

1. En la terminal de la carpeta "back", ejecutar
```bash
npm run dev
``` 
2. En la terminal de la carpeta "front", ejecutar
```bash
npm run dev
``` 

## Testing
1. Abrir terminal de la carpeta "back", ejecutar
```bash
npx ts-jest config:init 
``` 

2. Luego:
```bash
npm t
``` 