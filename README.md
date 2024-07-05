# Manual Técnico: AviCar

## Introducción
Este manual técnico describe la estructura y funcionamiento de la página web desarrollada utilizando Node.js para el backend y Angular para el frontend.

## Requisitos del Sistema
- Node.js 
- Angular CLI 
- MongoDB 
- Docker 

## Estructura del Proyecto
El proyecto está estructurado de la siguiente manera:
- Frontend
- Database
- Backend


## Tecnologías Utilizadas
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB 

- **Frontend:**
  - Angular
  - TypeScript
  - HTML/CSS

## Instalación y Configuración
### Backend
1. Clonar el repositorio desde GitHub:
`git clone https://github.com/HenryD11703/P2_MIA_202004071`

2. Instalar las dependencias:

3. Configurar las variables de entorno

4. Iniciar el servidor:


## Funciones Principales

```js
const insertOne = async (collectionName, data) => {
    console.log('Inserting data.. URI:', uri);
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(data);
        return result;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await client.close();
    }
}
```
Esta funcion es para hacer inserciones a la base de datos ya que toma una coleccion de la base
e ingresa el data siendo este `data` un objeto del dato que se este manejando

```js
const find = async (collectionName, query) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(collectionName);
        const result = await collection.find(query).toArray();
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

const findAll = async (collectionName) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(collectionName);
        const result = await collection.find().toArray();
        return result;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await client.close();
    }
}
```
Las funciones de find, y find all, find se encarga de encontrar un campo de los datos de una coleccion y retornarlo como arreglo
Mientras que find all se encarga de retornar TODOS los datos de una collecion

## Bucket de Imagenes en S3
Las imagenes que sean ingresadas por los usuarios en este proyecto son almacenadas en un bucket de los servicios de s3 de amazon
```js

const uploadFile2 = async (path, imagen) => {
    // 062620241234012340.jpg
    const buffer = new Buffer.from(imagen, 'base64');
    console.log('Bucket: ', BUCKET_USER_ID)
    const s3 = new aws.S3({
        accessKeyId: BUCKET_USER_ID,
        secretAccessKey: BUCKET_USER_SECRET,
        ContentType: 'image/jpeg/png',
        ACL: 'public-read',
    });

    const params = {
        Bucket: BUCKET_NAME,
        Key: path,
        Body: buffer,
    };

    await s3.upload(params, function sync(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log('Ubicacion de la imagen: ', data.Location);  
            return data.Location;
        }});  
};
```
el cual es conectado con estas funciones en las que se necesitan ciertos parametros de amazon s3 para conectarlo

## Funciones de la aplicacion
```js
const register = async (req, res) => {

    //Recibir los datos del usuario
    const { path, imagen, nombre, usuario, correo, contrasena, confirmar_contraseña, tipo } = req.body;



    const ruta_aws = `https://mia202004071.s3.amazonaws.com/${path}`;


    console.log('Ruta de la imagen:', ruta_aws);

    await uploadFile2(path, imagen);

    //Manipular los datos
    if (contrasena !== confirmar_contraseña) {
        return res.status(400).json({
            status: false,
            msg: 'Las contraseñas no coinciden'
        });
    }

    //Encriptar la contraseña
    const salt = await bcrypt.genSalt(10); //Generar un salt
    // un salt es una cadena aleatoria que se añade al hash para hacerlo único y el 10 indica 
    //el número de veces que se aplica el algoritmo de encriptación
    const encryptedPassword = await bcrypt.hash(contrasena, salt);

    //Guardar los datos en la base de datos 
    const result = await insertOne('Usuarios', {
        imagen: ruta_aws,
        nombre,
        usuario,
        correo,
        contrasena: encryptedPassword,
        tipo
    });

    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al registrar el usuario'
        });
    }


    //Enviar respuesta
    res.status(200).json({
        status: true,
        msg: `Usuario ${nombre} registrado correctamente`,
        data: result,
        imagen: ruta_aws    // Enviar la ruta de la imagen para que el front la pueda mostrar
    });

}
```
Dentro de las funciones de esta aplicacion las mas importantes serian las funciones que permiten el registro de datos en la base de datos, en el que asi como esta se encarga de tomar una respuesta de una peticion post, y usar el objeto para guardar sus caracteristicas en los campos de la base de datos segun sea necesario

## Deploy en amazon EC2
Para simplificar el proceso de despliege a la hora de subir esta aplicacion a un servidor se implemento Docker para facilitar este proceso

```yml
version: '3.1'

services:

  mongo:
    image: mongo
    container_name: mongodb
    restart: always
    ports:
      - ${MONGO_PORT}:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
  api:
    build: ./backend
    env_file:
      - ./.env
    container_name: mia-api
    restart: always
    ports:
      - ${PORT}:${PORT}

  frontend:
    build: ./frontend
    container_name: mia-frontend
    restart: always
    ports:
      - 80:80
    depends_on:
      - api
```