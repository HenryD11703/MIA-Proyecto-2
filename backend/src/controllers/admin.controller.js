const { insertOne, findAll, deleteById } = require('../config/db.mongo');
const { find, deleteOne } = require('../config/db.mongo');
const bcrypt = require('bcrypt');

const registerAuto = async (req, res) => {

    const { agencia, marca, placa, modelo, precio, ciudad } = req.body;

    const result = await insertOne('autos', {
        agencia,
        marca,
        placa,
        modelo,
        precio,
        ciudad
    });

    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al registrar el auto'
        });
    }

    res.status(200).json({
        status: true,
        msg : `Auto ${marca} registrado correctamente`,
        data : result
    });

}


const registerViaje = async (req, res) => {

    const { agencia, origen, destino, dias, precio } = req.body;

    const result = await insertOne('viajes', {
        agencia,
        origen,
        destino,
        dias,
        precio
    });

    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al registrar el viaje'
        });
    }

    res.status(200).json({
        status: true,
        msg : `Viaje de ${origen} a ${destino} registrado correctamente`,
        data : result
    });

}

const getTouristQ = async (req, res) => {
    console.log('Buscando cantidad de turistas');
    const result = await find('Usuarios', { tipo: 'Turista' });
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener la cantidad de turistas'
        });
    }
    res.status(200).json({
        status: true,
        quantity: result.length
    });
}

const getAutoQ = async (req, res) => {
    console.log('Buscando cantidad de autos');
    const result = await findAll('autos');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener la cantidad de autos'
        });
    }
    res.status(200).json({
        status: true,
        quantity: result.length
    });
}

const getTripsQ = async (req, res) => {
    console.log('Buscando cantidad de viajes');
    const result = await findAll('viajes');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener la cantidad de viajes'
        });
    }
    res.status(200).json({
        status: true,
        quantity: result.length
    });
}

const listUsers = async (req, res) => {
    console.log('Buscando usuarios');
    const result = await findAll('Usuarios');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener los usuarios'
        });
    }
    res.status(200).json({
        status: true,
        usuarios: result
    });
}

const listReservations = async (req, res) => {
    console.log('Buscando reservas');
    const result = await findAll('Reserva');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener las reservas'
        });
    }   
    res.status(200).json({
        status: true,
        reservas: result
    });
}

const listTrips = async (req, res) => {
    console.log('Buscando viajes');
    const result = await findAll('viajes');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener los viajes'
        });
    }
    res.status(200).json({
        status: true,
        viajes: result
    });
}

const deleteUser = async (req, res) => {
    const { usuario } = req.body;

    const result = await deleteOne('Usuarios', { usuario });

    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al eliminar el usuario'
        });
    }

    res.status(200).json({
        status: true,
        msg: `Usuario ${usuario} eliminado correctamente`
    });    
}

const getTotalUsers = async (req, res) => {
    console.log('Buscando cantidad de usuarios');
    const result = await findAll('Usuarios');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener la cantidad de usuarios'
        });
    }
    res.status(200).json({
        status: true,
        total: result.length
    });
}

const getTotalAdmins = async (req, res) => {
    console.log('Buscando cantidad de administradores');
    const result = await find('Usuarios', { tipo: 'Administrador' });
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener la cantidad de administradores'
        });
    }
    res.status(200).json({
        status: true,
        total: result.length
    });
}

const getTotalRecs = async (req, res) => {
    console.log('Buscando cantidad de recepciones');
    const result = await find('Usuarios', { tipo: 'Recepcionista' });
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener la cantidad de recepciones'
        });
    }
    res.status(200).json({
        status: true,
        total: result.length
    });
}

const getAutos = async (req, res) => {
    const result = await findAll('autos');
    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al obtener autos'
        });
    }
    res.status(200).json({
        status: true,
        autos: result
    });
}

const deleteAuto = async (req, res) => {
    const { placa } = req.body;

    const result = await deleteOne('autos', { placa });

    if (result instanceof Error) {
        return res.status(500).json({
            status: false,
            msg: 'Error al eliminar el auto'
        });
    }

    res.status(200).json({
        status: true,
        msg: `Auto ${placa} eliminado correctamente`
    });    
}


const deleteTrip = async (req, res) => {
    // Obtenemos el _id de mongo del cuerpo de la solicitud
    const { _id } = req.body;

    try {
        // Usamos la función deleteById para eliminar el viaje
        const result = await deleteById('viajes', _id);

        // Verificamos el resultado de la operación
        if (result.deletedCount === 1) {
            res.status(200).json({
                status: true,
                msg: `Viaje con ID ${_id} eliminado correctamente`
            });
        } else {
            res.status(404).json({
                status: false,
                msg: `No se encontró un viaje con el ID ${_id}`
            });
        }
    } catch (error) {
        console.error('Error al eliminar el viaje:', error);
        res.status(500).json({
            status: false,
            msg: 'Error al eliminar el viaje'
        });
    }
}

const deleteReservation = async (req, res) => {
    // Obtenemos el _id de mongo del cuerpo de la solicitud
    const { _id } = req.body;

    try {
        // Usamos la función deleteById para eliminar la reserva
        const result = await deleteById('Reserva', _id);

        // Verificamos el resultado de la operación
        if (result.deletedCount === 1) {
            res.status(200).json({
                status: true,
                msg: `Reserva con ID ${_id} eliminada correctamente`
            });
        } else {
            res.status(404).json({
                status: false,
                msg: `No se encontró una reserva con el ID ${_id}`
            });
        }
    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        res.status(500).json({
            status: false,
            msg: 'Error al eliminar la reserva'
        });
    }
}




module.exports = {
    registerAuto,
    registerViaje,
    getTouristQ,
    getAutoQ,
    getTripsQ,
    listUsers,
    deleteUser,
    getTotalUsers,
    getTotalAdmins,
    getTotalRecs,
    getAutos,
    deleteAuto,
    listTrips,
    deleteTrip,
    listReservations,
    deleteReservation
};