const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE: DB_NAME
} = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

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

const findOne = async (collectionName, query) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(collectionName);
        const result = await collection.findOne(query);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
};

const findReservationsByUser = async (usuario) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    try {
      await client.connect();
      console.log('Conectado a la base de datos');
      
      const database = client.db(DB_NAME);
      const collection = database.collection('Reserva');
      
      const query = { usuario: usuario };
      const reservas = await collection.find(query).toArray();
      
      if (reservas.length === 0) {
        console.log(`No se encontraron reservas para el usuario ${usuario}`);
        return [];
      }
  
      console.log(`Reservas encontradas para el usuario ${usuario}:`);
      reservas.forEach(reserva => {
        console.log(`
          ID: ${reserva._id}
          Agencia: ${reserva.agencia}
          Origen: ${reserva.origen}
          Destino: ${reserva.destino}
          Días: ${reserva.dias}
          Precio: ${reserva.precio}
        `);
        
        if (reserva.agencia_auto) {
          console.log(`
            Agencia de auto: ${reserva.agencia_auto}
            Marca: ${reserva.marca}
            Modelo: ${reserva.modelo}
            Placa: ${reserva.placa}
            Precio del auto: ${reserva.precio_auto}
            Ciudad del auto: ${reserva.ciudad_auto}
          `);
        }
        console.log('-------------------');
      });
  
      return reservas;
    } catch (error) {
      console.error('Error al buscar las reservas:', error);
      return [];
    } finally {
      await client.close();
      console.log('Conexión a la base de datos cerrada');
    }
  };
  

const deleteOne = async (collectionName, query) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(collectionName);
        const result = await collection.deleteOne(query);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

const deleteById = async (collectionName, id) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection(collectionName);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

const addAprobadoToReserva = async (id) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db(DB_NAME);
        const collection = database.collection('Reserva');
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { aprobado: true } });
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

module.exports = {
    insertOne,
    find,
    findAll,
    findOne,
    findReservationsByUser,
    deleteOne,
    deleteById,
    addAprobadoToReserva
};